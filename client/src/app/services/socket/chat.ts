import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ChatFormaterService } from "./chatFormater.service";
import { SocketHandlerService } from "./socketHandler.service";
import { SocketSubscriber } from "./socketSubscriber";

export class Chat implements SocketSubscriber {
    private chat: HTMLElement;
    private container: HTMLElement;

    public constructor(public chatFormaterService: ChatFormaterService, chat: HTMLElement, container: HTMLElement) {
        this.chat = chat;
        this.container = container;
    }

    public subscribeToSocket(): void {
        SocketHandlerService.getInstance().subscribe(Event.UserDisconnected, this);
        SocketHandlerService.getInstance().subscribe(Event.NewUser, this);
        SocketHandlerService.getInstance().subscribe(Event.InvalidClick, this);
        SocketHandlerService.getInstance().subscribe(Event.DifferenceFound, this);
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
