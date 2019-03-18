import { Server } from "http";
import * as socketIo from "socket.io";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonScoreEntry } from "../../../../common/model/gameCard";
import { _e, R } from "../../strings";
// tslint:disable:no-any
const dateFormat: any = require("dateformat");
import { GameCardService } from "../gameCard/gameCard.service";
import { SocketSubscriber } from "./socketSubscriber";

export class SocketHandler {
    private static instance: SocketHandler;

    private io: socketIo.Server;
    private idUsernames: Map<string, Object>;
    private subscribers: Map<string, SocketSubscriber[]>;

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

    public subscribe(event: Event, subscriber: SocketSubscriber): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        const sub: SocketSubscriber[] = this.subscribers.get(event) as SocketSubscriber[];
        sub.push(subscriber);
    }

    private constructor() {
        this.subscribers = new Map<string, SocketSubscriber[]>();
    }

    private init(): void {
        this.idUsernames = new Map<string, Object>();
        this.io.on("connect", (socket: SocketIO.Socket) => {
            this.idUsernames.set(socket.id, "");

            this.setEventListeners(socket);
        });
    }

    private setEventListeners(socket: SocketIO.Socket): void {
        this.onUsernameConnected(socket);
        this.onUserDisconnected(socket);
    }

    private onUsernameConnected(socket: any): void {
        socket.on(Event.UserConnected, (message: ICommonSocketMessage) => {
            this.idUsernames.set(socket.id, message.data);
            this.notifySubsribers(Event.UserConnected, message);
            /*
            const welcomeMsg: ICommonSocketMessage = {
                data: _e(R.SOCKET_USERCONNECTED, [message.data]),
                timestamp: dateFormat(message.timestamp, R.SOCKET_DATE),
            };
            socket.broadcast.emit("NewUser", welcomeMsg);
            */
        });
    }

    private onUserDisconnected(socket: any): void {
        socket.on("disconnect", () => {
            const username: Object | undefined = this.idUsernames.get(socket.id);
            const goodByeMsg: ICommonSocketMessage = {
                data: _e(R.SOCKET_USERDISCONNECTED, [username]),
                timestamp: dateFormat(new Date(), R.SOCKET_DATE),
            };
            const newScore: ICommonScoreEntry = {name: "Sam", score: 16};
            GameCardService.updateScore(undefined, undefined, newScore);
            socket.broadcast.emit("UserDisconnected", goodByeMsg);
        });
    }

    private notifySubsribers(event: Event, message: ICommonSocketMessage): void {
        if (this.subscribers.has(event)) {
            const subscribers: SocketSubscriber[] = this.subscribers.get(event) as SocketSubscriber[];
            subscribers.forEach((subscriber: SocketSubscriber) => {
                subscriber.notify(event, message);
            });
        }
    }
}
