import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ChatFormaterService } from "./ChatFormater.service";
import { SocketHandlerService } from "./socketHandler.service";
import { SocketSubscriber } from "./socketSubscriber";

export class ChatService implements SocketSubscriber {
   // private static instance: ChatService;
    private chat: HTMLElement;
    private container: HTMLElement;
/*
    public static getInstance(): ChatService {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService(new ChatFormaterService);
        }

        return ChatService.instance;
    }
    */

    public constructor(public chatFormaterService: ChatFormaterService, private socketService: SocketHandlerService) {
        this.subscribeToSocket();
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.UserDisconnected, this);
        this.socketService.subscribe(Event.NewUser, this);
        this.socketService.subscribe(Event.InvalidClick, this);
        this.socketService.subscribe(Event.DifferenceFound, this);
    }

    public  setChat(chat: HTMLElement, container: HTMLElement): void {
        this.chat = chat;
        this.container = container;
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
