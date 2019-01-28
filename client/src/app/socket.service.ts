import { Injectable, OnInit } from "@angular/core";
import * as io from "socket.io-client";

@Injectable({
    providedIn: "root",
})
export class SocketService implements OnInit {

    public constructor() { }

    public id: string;
    public socket: SocketIOClient.Socket;

    public ngOnInit(): void {
        this.socket = io("http://localhost:3000");
        console.log("websocket created");
        this.id = this.socket.id;
        console.log("current socket id :" + this.id);
    }

    public sendUsername(username: string): void {
        console.log("Calling event 'newUsername'!!! ");
        this.socket.emit("newUsername", {
            name : username,
        });
    }

    public validationInfo(): void {
        console.log("UsernameValidation event received!!!! =D");
        this.socket.on("UsernameValidation", (truthValue: boolean) => {
            console.log(truthValue);
        });
    }
}
