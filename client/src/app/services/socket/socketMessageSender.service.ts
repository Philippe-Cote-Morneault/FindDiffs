import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { SocketHandlerService } from "./socketHandler.service";
import { SocketStringFormaterService } from "./socketStringFormater.service";
import { SocketSubscriber } from "./socketSubscriber";

export class SocketMessageSenderService implements SocketSubscriber {
    private static instance: SocketMessageSenderService;

    public static getInstance(): SocketMessageSenderService {
        if (!SocketMessageSenderService.instance) {
            SocketMessageSenderService.instance = new SocketMessageSenderService(new SocketStringFormaterService);
        }

        return SocketMessageSenderService.instance;
    }

    private constructor(public socketStringFormaterService: SocketStringFormaterService) {
    }

    public subscribeToSocket(): void {
        SocketHandlerService.getInstance().subscribe(Event.UserConnected, this);
        SocketHandlerService.getInstance().subscribe(Event.UserDisconnected, this);
        SocketHandlerService.getInstance().subscribe(Event.NewUser, this);
    }

    public notify(event: Event, message: ICommonSocketMessage): void {
        switch (event) {
            case Event.UserDisconnected: {
                const data: string = this.socketStringFormaterService.onUserDisconnected(message);
                this.showMessage(data);
                break;
            }
            case Event.NewUser: {
                const data: string = this.socketStringFormaterService.onNewUser(message);
                this.showMessage(data);
                break;
            }
            default: {
                const data: string = this.socketStringFormaterService.onDefault();
                this.showMessage(data);
             }
         }
    }

    private showMessage(data: string): void {
        // Met data dans chat
        // tslint:disable-next-line:no-console
        console.log(data + "data");
    }
}
