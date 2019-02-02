import { Injectable, OnInit } from "@angular/core";
import * as io from "socket.io-client";
import { GameCard } from "../../../common/model/gameCard/gameCard";

import { Observable } from "rxjs";
import { Message } from "../../../common/communication/message";

// TODO: Find a better class to put this enum at
export enum Event {GAME_CARD_UPDATED = "gameCardUpdated", GAME_CARD_ADDED = "gameCardAdded",
                    GAME_CARD_DELETED = "gameCardDeleted", CONNECT = "connect"}

@Injectable({
    providedIn: "root",
})
export class SocketService implements OnInit {

    public id: string;
    public socket: SocketIOClient.Socket;

    public ngOnInit(): void {
        this.socket = io("http://localhost:3000");
        console.log("websocket created");
        this.id = this.socket.id;
    }

    public onEvent(event: Event): Observable<Message> {
        return new Observable<Message>((observer) => {
            this.socket.on(event, (message: Message) => observer.next(message));
        });
    }
}
