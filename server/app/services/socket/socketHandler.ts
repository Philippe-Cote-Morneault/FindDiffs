import { Server } from "http";
import * as socketIo from "socket.io";
import { ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";

export class SocketHandler {
    private static instance: SocketHandler;

    private io: socketIo.Server;

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
        this.io.on("connect", (socket: any) => {
            console.log("connected");

            socket.on("UserConnected", (message: ICommonSocketMessage) => {
                console.log(message);
                const welcomeMsg: Object = {
                    hi: "Welcome to the game : ",
                    usename: message.data,
                    time: message.timestamp,
                }
                socket.broadcast.emit("NewUser", welcomeMsg);
            });
        });
    }
}
