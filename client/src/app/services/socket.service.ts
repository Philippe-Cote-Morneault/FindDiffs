import { Injectable, OnInit } from "@angular/core";
import * as io from "socket.io-client";

import { Observable } from "rxjs";
import { Message } from "../../../../common/communication/message";
import { SERVER_URL } from "../../../../common/url";

export enum Event {GAME_CARD_UPDATED = "gameCardUpdated", GAME_CARD_ADDED = "gameCardAdded",
                    GAME_CARD_DELETED = "gameCardDeleted", CONNECT = "connect"}

@Injectable({
    providedIn: "root",
})
export class SocketService implements OnInit {

    public id: string;
    public socket: SocketIOClient.Socket;

    public ngOnInit(): void {
        this.socket = io(SERVER_URL);
        this.id = this.socket.id;
    }

    public onEvent(event: Event): Observable<Message> {
        return new Observable<Message>((observer) => {
            this.socket.on(event, (message: Message) => observer.next(message));
        });
    }
}
