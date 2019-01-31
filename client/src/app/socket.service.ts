import { Injectable, OnInit } from "@angular/core";
import * as io from "socket.io-client";
import { GameCard } from "../../../common/communication/gameCard";

import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SocketService implements OnInit {
    public id: string;
    private socket: SocketIOClient.Socket;

    public constructor() {
        this.socket = io("http://localhost:3000");
        this.id = this.socket.id;
     }

    public ngOnInit(): void { }

    public onGameCardAdded(): Observable<GameCard> {
        return new Observable<GameCard>((observer) => {
            this.socket.on("gameCardAdded", (data: GameCard) => observer.next(data));
        });
    }

    public onGameCardDeleted(): Observable<GameCard> {
        return new Observable<GameCard>((observer) => {
            this.socket.on("gameCardDeleted", (data: GameCard) => observer.next(data));
        });
    }

    public onGameCardUpdate(): Observable<GameCard> {
        return new Observable<GameCard>((observer) => {
            this.socket.on("gameCardUpdated", (data: GameCard) => observer.next(data));
        });
    }

    public sendUsername(username: string): void {
        this.socket.emit("newUsername", {
            name : username,
        });
    }
}
