import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { SERVER_URL } from "../../../../../common/url";
import { SocketStringFormaterService } from "./socketStringFormater.service";
import { SocketSubscriber } from "./socketSubscriber";

@Injectable({
    providedIn: "root",
})

export class SocketHandlerService {
    public id: string;
    public socket: SocketIOClient.Socket;
    private subscribers: Map<string, SocketSubscriber[]>;

    public constructor(public socketStringFormaterService: SocketStringFormaterService) {
        this.init();
    }

    public init(): void {
        this.socket = io(SERVER_URL);
        this.id = this.socket.id;
    }

    public subscribe(event: Event, subscriber: SocketSubscriber): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        const sub: SocketSubscriber[] = this.subscribers.get(event) as SocketSubscriber[];
        sub.push(subscriber);
    }

    /* private notifySubsribers(event: Event, message: ICommonSocketMessage): void {
        if (this.subscribers.has(event)) {
            const subscribers: SocketSubscriber[] = this.subscribers.get(event) as SocketSubscriber[];
            subscribers.forEach((subscriber: SocketSubscriber) => {
                subscriber.notify(event, message);
            });
        }
    }*/

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
