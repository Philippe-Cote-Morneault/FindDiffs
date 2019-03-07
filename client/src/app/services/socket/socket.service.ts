import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";

@Injectable({
    providedIn: "root",
})

export class SocketService {
    public id: string;
    public socket: SocketIOClient.Socket;

    public constructor() {
        this.init();
    }

    public init(): void {
        this.socket = io("http://localhost:3000");
        this.id = this.socket.id;

        /*this.socket.on('connect', function () {
            console.log("connected");
        });*/
    }

    public notifyNewUser(username: string): void {
        console.log("notify");
        const message: ICommonSocketMessage = {
            data: username,
            timestamp: new Date(),
        };
        console.log(message);

        this.socket.emit("UserConnected", message);
    }
}
