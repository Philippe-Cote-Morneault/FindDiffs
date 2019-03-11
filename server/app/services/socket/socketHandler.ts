import { Server } from "http";
import * as socketIo from "socket.io";
import { ICommonSocketMessage, ICommonTest } from "../../../../common/communication/webSocket/socketMessage";

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
        // tslint:disable-next-line:no-any
        this.io.on("connect", (socket: any) => {
            // console.log("connected");
            this.idUsernames.set(socket.id, "");
            socket.on("UserConnected", (message: ICommonSocketMessage) => {
                // console.log(message);
                this.idUsernames.set(socket.id, message.data);
                const welcomeMsg: ICommonTest = {
                    hi: "Welcome to the game : ",
                    usename: message.data,
                    time: message.timestamp,
                };
                socket.broadcast.emit("NewUser", welcomeMsg);
            });

            socket.on("disconnect", () => {
                const username: Object | undefined = this.idUsernames.get(socket.id);
                const goodByeMsg: Object = {
                    bye: "Good bye :'( : " + username,
                    id: socket.id,
                };
                socket.broadcast.emit("UserDisconnected", goodByeMsg);
            });
        });
    }
}
