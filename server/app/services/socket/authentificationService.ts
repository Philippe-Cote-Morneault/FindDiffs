import * as uuid from "uuid";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonToken } from "../../../../common/communication/webSocket/token";
import { ICommonUser } from "../../../../common/communication/webSocket/user";
import { UserManager } from "./userManager";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { _e, R } from "../../strings";
import { SocketHandler } from "./socketHandler";

export class AuthentificationService {
    private static readonly MAX_CLIENT_DISCONNECT_TIME: number = 30000;
    private static instance: AuthentificationService;

    private usernameManager: UserManager;
    private authentifiedUsers: Map<string, string>;
    private activeCleanupTimers: Map<string, NodeJS.Timeout>;

    public static getInstance(): AuthentificationService {
        if (!AuthentificationService.instance) {
            AuthentificationService.instance = new AuthentificationService();
        }

        return AuthentificationService.instance;
    }

    private constructor() {
        this.usernameManager = UserManager.getInstance();
        this.authentifiedUsers = new Map();
        this.activeCleanupTimers = new Map();
    }

    public startCleanupTimer(socket: SocketIO.Socket): void {
        console.log("removing id: " + socket.id);
        const removedUsername: string | undefined = this.usernameManager.removeUsername(socket.id);
        console.log("trie to startCleanup, but undefinde uesr");
        if (removedUsername) {
        const token: string = this.getTokenFromUsername(removedUsername);
        const timeout: NodeJS.Timeout = setTimeout(() => {
            console.log("timerExpired");
            this.removeUser(token, socket.server, removedUsername);
        }, AuthentificationService.MAX_CLIENT_DISCONNECT_TIME);

        this.activeCleanupTimers.set(token, timeout);
    }
    }

    private removeUser(token: string, socketServer: SocketIO.Server, username: string): void {
        console.log("removingUser");
        this.authentifiedUsers.delete(token);
        const user: ICommonUser = {
            username: username,
        };
        const message: ICommonSocketMessage = {
            data: user,
            timestamp: new Date(),
        };
        console.log(this.authentifiedUsers);

        SocketHandler.getInstance().broadcastMessage(Event.UserDisconnected, message);
    }

    public authenticateUser(socket: SocketIO.Socket, successCallback: (newUsername: string) => void): void {
        socket.on(Event.Authenticate, (message: ICommonSocketMessage) => {
            const receivedToken: string = (message.data as ICommonToken).token;
            console.log("validating existing user token: " + receivedToken);
            const username: string | undefined = this.validateExistingUser(receivedToken);
            console.log("validating existing user: " + username);
            if (username) {
                this.stopCleanupTimer(receivedToken);
                this.usernameManager.addUsername(socket.id, username);
                successCallback(username);
            }
        });
        socket.on(Event.NewUser, (message: ICommonSocketMessage) => {
            const username: string = (message.data as ICommonUser).username;
            console.log("newUser: " + username);
            if (this.usernameManager.validateUsername(username)) {
                const oldUsername: string | undefined = this.usernameManager.getUsername(socket.id);
                if (oldUsername) {
                    this.deleteOldUsername(oldUsername);
                }
                this.usernameManager.addUsername(socket.id, (message.data as ICommonUser).username);
                const token: string = this.sendValidationToken(socket);
                this.authentifiedUsers.set(token, username);
                console.log("authehtifiedUsers token");
                console.log(this.authentifiedUsers);
                successCallback(username);
            }
        });
    }

    private validateExistingUser(token: string): string | undefined {
        return this.authentifiedUsers.get(token);
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
        this.authentifiedUsers.forEach((val: string, key) => { 
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
        console.log("stoped cleanup timer");
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
