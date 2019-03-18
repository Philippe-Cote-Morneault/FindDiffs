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
        SocketHandlerService.getInstance().subscribe(Event.UserConnected, this);
        SocketHandlerService.getInstance().subscribe(Event.UserDisconnected, this);
        SocketHandlerService.getInstance().subscribe(Event.NewUser, this);
    }

    public notify(event: Event, message: ICommonSocketMessage): void {
        // tslint:disable-next-line:no-console
        console.log(this.socketStringFormaterService.messageFormater(event, message));
    }
}
