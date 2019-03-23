import { Injectable } from "@angular/core";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ChatFormaterService } from "./chatFormater.service";
import { SocketHandlerService } from "./socketHandler.service";
import { SocketSubscriber } from "./socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class Chat implements SocketSubscriber {
    private chat: HTMLElement;
    private container: HTMLElement;

    public constructor(public socketService: SocketHandlerService, public chatFormaterService: ChatFormaterService) {
        this.subscribeToSocket();
    }

    public setContainers(chat: HTMLElement, container: HTMLElement): void {
        this.chat = chat;
        this.container = container;
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.UserDisconnected, this);
        this.socketService.subscribe(Event.NewUser, this);
        this.socketService.subscribe(Event.InvalidClick, this);
        this.socketService.subscribe(Event.DifferenceFound, this);
    }

    public notify(event: Event, message: ICommonSocketMessage): void {
        const data: string = this.chatFormaterService.formatMessage(event, message);
        this.appendToChat(data);
    }

    private appendToChat(data: string): void {
        const pre: HTMLElement = document.createElement("p");
        pre.innerText = data;
        this.chat.appendChild(pre);
        this.container.scrollTop = this.container.scrollHeight;
    }
}
