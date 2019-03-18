import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { SERVER_URL } from "../../../../../common/url";
import { SocketSubscriber } from "./socketSubscriber";

@Injectable({
    providedIn: "root",
})

export class SocketHandlerService {
    private static instance: SocketHandlerService;

    public id: string;
    public socket: SocketIOClient.Socket;
    private subscribers: Map<string, SocketSubscriber[]>;

    public static getInstance(): SocketHandlerService {
        if (!this.instance) {
            this.instance = new SocketHandlerService();
        }

        return this.instance;
    }
    public constructor() {
        this.subscribers = new Map<string, SocketSubscriber[]>();
        this.init();
    }

    public init(): void {
        this.socket = io(SERVER_URL);
        this.id = this.socket.id;
    }

    public subscribe(event: Event, subscriber: SocketSubscriber): void {
        // tslint:disable:no-console
        console.log(!this.subscribers.has(event));
        console.log(event);
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        const sub: SocketSubscriber[] = this.subscribers.get(event) as SocketSubscriber[];
        sub.push(subscriber);
    }

    private notifySubsribers(event: Event, message: ICommonSocketMessage): void {
        console.log(this.subscribers.has(event));
        console.log(event);
        if (this.subscribers.has(event)) {
            const subscribers: SocketSubscriber[] = this.subscribers.get(event) as SocketSubscriber[];
            subscribers.forEach((subscriber: SocketSubscriber) => {
                subscriber.notify(event, message);
            });
        }
    }

    public notifyNewUser(username: string): void {
        const message: ICommonSocketMessage = {
            data: username,
            timestamp: new Date(),
        };
        this.socket.emit(Event.UserConnected, message);
    }

    public newUserConnected(): void {
        this.socket.on(Event.NewUser, (message: ICommonSocketMessage) => {
            this.notifySubsribers(Event.UserConnected, message);
        });
    }

    public userDisconnected(): void {
        this.socket.on(Event.UserDisconnected, (message: ICommonSocketMessage) => {
            this.notifySubsribers(Event.UserDisconnected, message);
        });
    }

    /*private sendMessage(messageType: string, message: ICommonSocketMessage, chat: HTMLElement, container: HTMLElement): void {
        const pre: HTMLElement = document.createElement("p");
        pre.innerText = this.socketStringFormaterService.messageFormater(messageType, message);
        chat.appendChild(pre);
        container.scrollTop = container.scrollHeight;
    }*/
}
