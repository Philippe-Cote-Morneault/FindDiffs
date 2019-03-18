import { Server } from "http";
import * as socketIo from "socket.io";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonUser } from "../../../../common/communication/webSocket/user";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { _e, R } from "../../strings";
import { SocketSubscriber } from "./socketSubscriber";

export class SocketHandler {
    private static instance: SocketHandler;
    private static CONNECT_EVENT: string = "connect";
    private static DISCONNECT_EVENT: string = "disconnect";

    private io: socketIo.Server;
    private idUsernames: Map<string, string>;
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

    public sendMessage(event: Event, message: ICommonSocketMessage, username: string): void {
        const targetId: string = this.getSocketId(username);
        this.io.to(targetId).emit(event, message);
    }

    public broadcastMessage(event: Event, message: ICommonSocketMessage): void {
        this.io.sockets.emit(event, message);
    }

    private constructor() {
        this.subscribers = new Map<string, SocketSubscriber[]>();
    }

    private init(): void {
        this.idUsernames = new Map<string, string>();
        this.io.on(SocketHandler.CONNECT_EVENT, (socket: SocketIO.Socket) => {
            this.idUsernames.set(socket.id, "");
            this.setEventListeners(socket);
        });
    }

    private setEventListeners(socket: SocketIO.Socket): void {
        this.onUsernameConnected(socket);
        this.onUserDisconnected(socket);
        this.onPlaySoloGame(socket);
        this.onReadyToPlay(socket);
    }

    private onUsernameConnected(socket: SocketIO.Socket): void {
        socket.on(Event.UserConnected, (message: ICommonSocketMessage) => {
            const username: string = (message.data as ICommonUser).username;
            this.addUsername(socket.id, username);
            socket.broadcast.emit(Event.NewUser, message);
            this.notifySubsribers(Event.UserConnected, message, username);
        });
    }

    private onUserDisconnected(socket: SocketIO.Socket): void {
        socket.on(SocketHandler.DISCONNECT_EVENT, () => {
            const user: ICommonUser = {
                username: this.getUsername(socket.id),
            };
            this.removeUsername(socket.id);
            socket.broadcast.emit(Event.UserDisconnected, user);
        });
    }

    private onPlaySoloGame(socket: SocketIO.Socket): void {
        socket.on(Event.PlaySoloGame, (message: ICommonSocketMessage) => {
            this.notifySubsribers(Event.PlaySoloGame, message, this.getUsername(socket.id));
        });
    }

    private onReadyToPlay(socket: SocketIO.Socket): void {
        socket.on(Event.ReadyToPlay, (message: ICommonSocketMessage) => {
            this.notifySubsribers(Event.ReadyToPlay, message, this.getUsername(socket.id));
        });
    }

    private notifySubsribers(event: Event, message: ICommonSocketMessage, username: string): void {
        if (this.subscribers.has(event)) {
            const subscribers: SocketSubscriber[] = this.subscribers.get(event) as SocketSubscriber[];
            subscribers.forEach((subscriber: SocketSubscriber) => {
                subscriber.notify(event, message, username);
            });
        }
    }

    private addUsername(username: string, socketId: string): void {
        this.idUsernames.set(socketId, username);
    }

    private getUsername(socketId: string): string {
        return (this.idUsernames.get(socketId)) as string;
    }

    private removeUsername(socketId: string): void {
        this.idUsernames.delete(socketId);
    }

    private getSocketId(username: string): string {
        const id: string | undefined =  Object.keys(this.idUsernames).find((key: string) => this.idUsernames[key] === username);
        if (id === undefined) {
                throw new NotFoundException(_e(R.ERROR_INVALIDID, [username]));
        }

        return id;
    }
}
