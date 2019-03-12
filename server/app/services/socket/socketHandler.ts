import { Server } from "http";
import * as socketIo from "socket.io";
import { ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { _e, R } from "../../strings";

export class SocketHandler {
    private static instance: SocketHandler;

    private io: socketIo.Server;
    private idUsernames: Map<string, Object>;

    public static getInstance(): SocketHandler {
        if (!this.instance) {
            this.instance = new SocketHandler();
        }

        return this.instance;
    }

    public setServer(server: Server): SocketHandler {
        this.io = socketIo(server);
        this.init();

        return this;
    }

    private init(): void {
        this.idUsernames = new Map<string, Object>();
        // tslint:disable:no-any
        this.io.on("connect", (socket: any) => {
            this.idUsernames.set(socket.id, "");

            this.onUsernameConnected(socket);
            this.onUserDisconnected(socket);
        });
    }

    private onUsernameConnected(socket: any): void {
        socket.on("UserConnected", (message: ICommonSocketMessage) => {
            this.idUsernames.set(socket.id, message.data);
            const welcomeMsg: ICommonSocketMessage = {
                data: _e(R.SOCKET_USERCONNECTED, [message.data]),
                timestamp: message.timestamp,
            };
            socket.broadcast.emit("NewUser", welcomeMsg);
        });
    }

    private onUserDisconnected(socket: any): void {
        socket.on("disconnect", () => {
            const username: Object | undefined = this.idUsernames.get(socket.id);
            const goodByeMsg: ICommonSocketMessage = {
                data: _e(R.SOCKET_USERDISCONNECTED, [username]),
                timestamp: new Date(),
            };
            socket.broadcast.emit("UserDisconnected", goodByeMsg);
        });
    }
}
