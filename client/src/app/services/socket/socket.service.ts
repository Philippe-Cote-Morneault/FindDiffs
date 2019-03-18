import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { SocketStringFormaterService } from "./socketStringFormater.service";

@Injectable({
    providedIn: "root",
})

export class SocketService {
    public id: string;
    public socket: SocketIOClient.Socket;

    public constructor(public socketStringFormaterService: SocketStringFormaterService) {
        this.init();
    }

    public init(): void {
        this.socket = io("http://localhost:3000");
        this.id = this.socket.id;
    }

    public notifyNewUser(username: string): void {
        const message: ICommonSocketMessage = {
            data: username,
            timestamp: new Date(),
        };
        this.socket.emit(Event.UserConnected, message);
    }

    public newUserConnected(chat: HTMLElement, container: HTMLElement): void {
        this.socket.on(Event.NewUser, (message: ICommonSocketMessage) => {
            this.sendMessage(Event.NewUser, message, chat, container);
        });
    }

    public userDisconnected(chat: HTMLElement, container: HTMLElement): void {
        this.socket.on(Event.UserDisconnected, (message: ICommonSocketMessage) => {
            this.sendMessage(Event.UserDisconnected, message, chat, container);
        });
    }

    private sendMessage(messageType: string, message: ICommonSocketMessage, chat: HTMLElement, container: HTMLElement): void {
        const pre: HTMLElement = document.createElement("p");
        pre.innerText = this.socketStringFormaterService.messageFormater(messageType, message);
        chat.appendChild(pre);
        container.scrollTop = container.scrollHeight;
    }
}
