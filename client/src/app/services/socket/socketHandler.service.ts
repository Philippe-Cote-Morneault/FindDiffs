import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { ICommonGame } from "../../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommonToken } from "../../../../../common/communication/webSocket/token";
import { ICommonUser } from "../../../../../common/communication/webSocket/user";
import { POVType } from "../../../../../common/model/gameCard";
import { ICommon2DPosition } from "../../../../../common/model/positions";
import { SERVER_URL } from "../../../../../common/url";
import { SocketSubscriber } from "./socketSubscriber";

@Injectable()

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
                const response: ICommonSocketMessage = {
                    data: tokendata,
                    timestamp: new Date(),
                };

                this.socket.emit(Event.Authenticate, response);
                this.setEventListeners(this.socket);
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

    public emitUser(username: string): void {
        const user: ICommonUser = {
            username: username,
        };
        const message: ICommonSocketMessage = {
            data: user,
            timestamp: new Date(),
        };
        this.socket.emit(Event.NewUser, message);
    }

    public emitClick(xPos: number, yPos: number): void {
        const pixel: ICommon2DPosition = {
            x: xPos,
            y: yPos,
        };
        const message: ICommonSocketMessage = {
            data: pixel,
            timestamp: new Date(),
        };
        this.socket.emit(Event.GameClick, message);
    }

    public emitPlayerSoloGame(id: string): void {
        const game: ICommonGame = {
            ressource_id: id,
            pov: POVType.Simple,
        };
        const message: ICommonSocketMessage = {
            data: game,
            timestamp: new Date(),
        };
        this.socket.emit(Event.PlaySoloGame, message);
    }

    public emitReadyToPlay(): void {
        this.socket.emit(Event.ReadyToPlay);
    }

    private setEventListeners(socket: SocketIOClient.Socket): void {
        this.onAuthenticate();
        Object.keys(Event).forEach((event: Event) => {
            socket.on(event, (message: ICommonSocketMessage) => {
                this.notifySubsribers(event, message);
            });
        });
    }

    // tslint:disable-next-line:max-func-body-length
    public onAuthenticate(): void {
        this.socket.on(Event.Authenticate, (message: ICommonSocketMessage) => {
            console.log(JSON.stringify(message));
            const token: string = (message.data as ICommonToken).token;
            console.log("Token doesn't exist, one received is " + token);
            sessionStorage.setItem("token", token);
            this.setEventListeners(this.socket);
        });
    }
}
