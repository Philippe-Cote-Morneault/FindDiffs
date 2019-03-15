import { Server } from "http";
import * as socketIo from "socket.io";
import { ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonScoreEntry } from "../../../../common/model/gameCard";
import { _e, R } from "../../strings";
import { GameCardService } from "../gameCard/gameCard.service";

export class SocketHandler {
    private static instance: SocketHandler;
    // tslint:disable:no-any

    private io: socketIo.Server;
    private idUsernames: Map<string, Object>;
    private dateFormat: any;

    public constructor() {
        this.dateFormat = require("dateformat");
    }

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

    private init(): void {
        this.idUsernames = new Map<string, Object>();
        this.io.on("connect", (socket: any) => {
            this.idUsernames.set(socket.id, "");

            this.onUsernameConnected(socket);
            this.onUserDisconnected(socket);
        });
    }

    private onUsernameConnected(socket: any): void {
        socket.on("UserConnected", (message: ICommonSocketMessage) => {
            this.idUsernames.set(socket.id, message.data);
            const welcomeMsg: ICommonSocketMessage = {
                data: _e(R.SOCKET_USERCONNECTED, [message.data]),
                timestamp: this.dateFormat(message.timestamp, R.SOCKET_DATE),
            };
            socket.broadcast.emit("NewUser", welcomeMsg);
        });
    }

    private onUserDisconnected(socket: any): void {
        socket.on("disconnect", () => {
            const username: Object | undefined = this.idUsernames.get(socket.id);
            const goodByeMsg: ICommonSocketMessage = {
                data: _e(R.SOCKET_USERDISCONNECTED, [username]),
                timestamp: this.dateFormat(new Date(), R.SOCKET_DATE),
            };
            const newScore: ICommonScoreEntry = {name: "Sam", score: 16};
            GameCardService.updateScore(undefined, undefined, newScore);
            socket.broadcast.emit("UserDisconnected", goodByeMsg);
        });
    }
}
