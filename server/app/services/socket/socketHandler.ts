import { Server } from "http";
import * as socketIo from "socket.io";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonUser } from "../../../../common/communication/webSocket/user";
import { UserManager } from "./userManager";
import { SocketCallback } from "./socketCallback";

export class SocketHandler {
    private static instance: SocketHandler;
    private static CONNECT_EVENT: string = "connect";
    private static DISCONNECT_EVENT: string = "disconnect";

    private io: socketIo.Server;
    private usernameManager: UserManager;
    private subscribers: Map<string, SocketCallback[]>;

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

    public subscribe(event: Event, callback: SocketCallback): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        const sub: SocketCallback[] = this.subscribers.get(event) as [];
        sub.push(callback);
    }

    public sendMessage(event: Event, message: ICommonSocketMessage, username: string): void {
        const targetId: string = this.usernameManager.getSocketId(username);
        this.io.to(targetId).emit(event, message);
    }

    public broadcastMessage(event: Event, message: ICommonSocketMessage): void {
        this.io.sockets.emit(event, message);
    }

    private constructor() {
        this.usernameManager = UserManager.getInstance();
        this.subscribers = new Map();
    }

    private init(): void {
        this.io.on(SocketHandler.CONNECT_EVENT, this.authenticateUser);
    }

    private setEventListeners(socket: SocketIO.Socket): void {
        this.onUsernameConnected(socket);
        this.onUserDisconnected(socket);
        Object.keys(Event).forEach((event: Event) => {
            socket.on(event, (message: ICommonSocketMessage) => {
                this.notifySubsribers(event, message, this.usernameManager.getUsername(socket.id));
            });
        });
        /*
        for (let event in Event) {
            socket.on(event, (message: ICommonSocketMessage) => {
                this.notifySubsribers(Event[event] as Event, message, this.getUsername(socket.id));
            })
        }
        */
        //this.onPlaySoloGame(socket);
        //this.onReadyToPlay(socket);
    }

    private onUsernameConnected(socket: SocketIO.Socket): void {
        socket.on(Event.UserConnected, (message: ICommonSocketMessage) => {
            const username: string = (message.data as ICommonUser).username;
            this.usernameManager.addUsername(socket.id, message.data.toString());
            socket.broadcast.emit(Event.NewUser, message);
            this.notifySubsribers(Event.UserConnected, message, username);
        });
    }

    private onUserDisconnected(socket: SocketIO.Socket): void {
        socket.on(SocketHandler.DISCONNECT_EVENT, () => {
            const user: ICommonUser = {
                username: this.usernameManager.getUsername(socket.id),
            };
            const message: ICommonSocketMessage = {
                data: user,
                timestamp: new Date(),
            };
            this.usernameManager.removeUsername(socket.id);
            socket.broadcast.emit(Event.UserDisconnected, message);
        });
    }

    /*
    private onPlaySoloGame(socket: SocketIO.Socket): void {
        socket.on(Event.PlaySoloGame, (message: ICommonSocketMessage) => {
            this.notifySubsribers(Event.PlaySoloGame, message, this.usernameManager.getUsername(socket.id));
        });
    }

    private onReadyToPlay(socket: SocketIO.Socket): void {
        socket.on(Event.ReadyToPlay, (message: ICommonSocketMessage) => {
            this.notifySubsribers(Event.ReadyToPlay, message, this.usernameManager.getUsername(socket.id));
        });
    }
    */

    private notifySubsribers(event: Event, message: ICommonSocketMessage, username: string): void {
        if (this.subscribers.has(event)) {
            const subscribers: SocketCallback[] = this.subscribers.get(event) as [];
            subscribers.forEach((callback: SocketCallback) => {
                callback(message, username);
            });
        }
    }

    private authenticateUser(socket: SocketIO.Socket): void {
        this.setEventListeners(socket);
    }
}
