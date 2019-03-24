import * as uuid from "uuid";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonToken } from "../../../../common/communication/webSocket/token";
import { ICommonUser } from "../../../../common/communication/webSocket/user";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { _e, R } from "../../strings";
import { SocketHandler } from "./socketHandler";
import { UsernameManager } from "./usernameManager";

export class AuthentificationService {
    private static readonly MAX_CLIENT_DISCONNECT_TIME: number = 1500;
    private static instance: AuthentificationService;

    private usernameManager: UsernameManager;
    private authentifiedUsers: Map<string, string>;
    private activeCleanupTimers: Map<string, NodeJS.Timeout>;

    public static getInstance(): AuthentificationService {
        if (!AuthentificationService.instance) {
            AuthentificationService.instance = new AuthentificationService();
        }

        return AuthentificationService.instance;
    }

    private constructor() {
        this.usernameManager = UsernameManager.getInstance();
        this.authentifiedUsers = new Map();
        this.activeCleanupTimers = new Map();
    }

    public startCleanupTimer(socket: SocketIO.Socket): void {
        const removedUsername: string | undefined = this.usernameManager.removeUsername(socket.id);
        if (removedUsername) {
            const token: string = this.getTokenFromUsername(removedUsername);
            const timeout: NodeJS.Timeout = setTimeout(() => {
                this.removeUser(token, socket.server, removedUsername);
            },                                         AuthentificationService.MAX_CLIENT_DISCONNECT_TIME);

            this.activeCleanupTimers.set(token, timeout);
        }
    }

    private removeUser(token: string, socketServer: SocketIO.Server, username: string): void {
        this.authentifiedUsers.delete(token);
        const user: ICommonUser = {
            username: username,
        };
        const message: ICommonSocketMessage = {
            data: user,
            timestamp: new Date(),
        };

        SocketHandler.getInstance().broadcastMessage(Event.UserDisconnected, message);
    }

    public authenticateUser(socket: SocketIO.Socket, successCallback: (newUsername: string) => void): void {
        socket.on(Event.Authenticate, (message: ICommonSocketMessage, response: (data: Object) => void) => {
            const receivedToken: string = (message.data as ICommonToken).token;
            const username: string | undefined = this.authentifiedUsers.get(receivedToken);
            if (username) {
                this.stopCleanupTimer(receivedToken);
                this.usernameManager.addUsername(socket.id, username);
                response({
                    username: username,
                });
                successCallback(username);
            } else {
                response({
                    error_message: R.ERROR_TOKEN,
                });
            }
        });
        socket.on(Event.NewUser, (message: ICommonSocketMessage, response: (data: Object) => void) => {
           response(this.newUser((message.data as ICommonUser).username, socket, successCallback));
        });
    }

    private newUser(username: string, socket: SocketIO.Socket, successCallback: (newUsername: string) => void): Object {
            if (this.usernameManager.validateUsername(username)) {
                const oldUsername: string | undefined = this.usernameManager.getUsername(socket.id);
                if (oldUsername) {
                    this.deleteOldUsername(oldUsername);
                }
                this.usernameManager.addUsername(socket.id, username);
                const token: string = this.sendValidationToken(socket);
                this.authentifiedUsers.set(token, username);
                successCallback(username);

                return {
                    token: token,
                };
            } else {
                return {
                    error_message: "failed to create",
                };
            }
    }

    private sendValidationToken(socket: SocketIO.Socket): string {
        const token: ICommonToken = {
            token: uuid.v4(),
        };

        const message: ICommonSocketMessage = {
            data: token,
            timestamp: new Date(),
        };

        socket.emit(Event.Authenticate, message);

        return token.token;
    }

    private getTokenFromUsername(username: string): string {
        let token: string | undefined;
        this.authentifiedUsers.forEach((val: string, key: string) => {
            if (val === username) {
                token = key;
            }
        });

        if (token === undefined) {
                throw new NotFoundException(_e(R.ERROR_INVALIDID, [username]));
        }

        return token;
    }

    private stopCleanupTimer(token: string): void {
        const timeout: NodeJS.Timeout | undefined = this.activeCleanupTimers.get(token);
        if (timeout) {
            clearTimeout(timeout);
        }
    }

    private deleteOldUsername(oldUsername: string): void {
        this.authentifiedUsers.forEach((username: string, token: string) => {
            if (username === oldUsername) {
                this.authentifiedUsers.delete(token);

                return;
            }
        });
    }
}
