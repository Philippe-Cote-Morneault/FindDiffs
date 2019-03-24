import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as io from "socket.io-client";
import { ICommonError } from "../../../../../common/communication/webSocket/error";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommonToken } from "../../../../../common/communication/webSocket/token";
import { SERVER_URL } from "../../../../../common/url";
import { SocketSubscriber } from "./socketSubscriber";

@Injectable({
    providedIn: "root",
})

export class SocketHandlerService {

    public id: string;
    public socket: SocketIOClient.Socket;
    private subscribers: Map<string, SocketSubscriber[]>;

    public constructor(private router: Router) {
        this.subscribers = new Map<string, SocketSubscriber[]>();
        this.init();
    }

    public init(): void {
        this.socket = io.connect(SERVER_URL);
        this.id = this.socket.id;
        this.setEventListener();
    }

    private setEventListener(): void {
        this.socket.on("connect", () => {
            const token: string | null = sessionStorage.getItem("token");
            if (token) {
                const tokendata: ICommonToken = {
                    token: token,
                };
                const message: ICommonSocketMessage = {
                    data: tokendata,
                    timestamp: new Date(),
                };

                this.socket.emit(Event.Authenticate, message, async (response: Object) => {
                    if ((response as ICommonError).error_message) {
                        alert((response as ICommonError).error_message);
                        sessionStorage.removeItem("token");
                        await this.router.navigateByUrl("/");
                        this.onAuthenticate();
                    } else {
                        this.setEventListeners(this.socket);
                    }
                });
            } else {
                this.onAuthenticate();
            }
        });
    }

    public subscribe(event: Event, subscriber: SocketSubscriber): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        const sub: SocketSubscriber[] = this.subscribers.get(event) as SocketSubscriber[];
        sub.push(subscriber);
    }

    private notifySubsribers(event: Event, message: ICommonSocketMessage): void {
        if (this.subscribers.has(event)) {
            const subscribers: SocketSubscriber[] = this.subscribers.get(event) as SocketSubscriber[];
            subscribers.forEach((subscriber: SocketSubscriber) => {
                subscriber.notify(event, message);
            });
        }
    }

    public emitMessage(event: Event, message: ICommonSocketMessage | null): void {
        this.socket.emit(event, message);
    }

    private setEventListeners(socket: SocketIOClient.Socket): void {
        this.onAuthenticate();
        Object.keys(Event).forEach((event: Event) => {
            socket.on(event, (message: ICommonSocketMessage) => {
                this.notifySubsribers(event, message);
            });
        });
    }

    public onAuthenticate(): void {
        this.socket.on(Event.Authenticate, (message: ICommonSocketMessage) => {
            const token: string = (message.data as ICommonToken).token;
            sessionStorage.setItem("token", token);
            this.setEventListeners(this.socket);
        });
    }
}
