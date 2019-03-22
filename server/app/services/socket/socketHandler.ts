import { Server } from "http";
import * as socketIo from "socket.io";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { AuthentificationService } from "./authentificationService";
import { SocketCallback } from "./socketCallback";
import { UserManager } from "./userManager";

export class SocketHandler {
    private static instance: SocketHandler;
    private static CONNECT_EVENT: string = "connect";
    private static DISCONNECT_EVENT: string = "disconnect";

    private io: socketIo.Server;
    private usernameManager: UserManager;
    private authentificationService: AuthentificationService;
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
        this.authentificationService = AuthentificationService.getInstance();
        this.subscribers = new Map();
    }

    private init(): void {
        this.io.on(SocketHandler.CONNECT_EVENT, (socket: SocketIO.Socket) => {
            this.authenticateUser(socket);
        });
    }

    private setEventListeners(socket: SocketIO.Socket): void {
        //this.onUsernameConnected(socket);
        this.onUserDisconnected(socket);
        Object.keys(Event).forEach((event: Event) => {
            socket.on(event, (message: ICommonSocketMessage) => {
                this.notifySubsribers(event, message, this.usernameManager.getUsername(socket.id));
            });
        });
    }

    private onUserDisconnected(socket: SocketIO.Socket): void {
        socket.on(SocketHandler.DISCONNECT_EVENT, (reason) => {
            console.log("disconnectEvent " + reason);
            this.authentificationService.startCleanupTimer(socket);
        });
    }

    private notifySubsribers(event: Event, message: ICommonSocketMessage, username: string): void {
        if (this.subscribers.has(event)) {
            const subscribers: SocketCallback[] = this.subscribers.get(event) as [];
            subscribers.forEach((callback: SocketCallback) => {
                callback(message, username);
            });
        }
    }

    private authenticateUser(socket: SocketIO.Socket): void {
        console.log("authenticateUser");
        this.authentificationService.authenticateUser(socket, (username: string) => {
            this.setEventListeners(socket);
            this.io.emit(Event.UserConnected, username);
        });
    }
}
