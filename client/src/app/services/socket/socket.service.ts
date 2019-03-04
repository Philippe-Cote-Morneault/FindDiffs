import { Injectable, OnInit } from "@angular/core";
import * as io from "socket.io-client";

@Injectable({
    providedIn: "root",
})
export class SocketService implements OnInit {
    public id: string;
    public socket: SocketIOClient.Socket;

    public ngOnInit(): void {
        this.socket = io("http://localhost:3000");
        this.id = this.socket.id;
    }
}