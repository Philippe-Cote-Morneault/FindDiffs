import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";

export interface SocketSubscriber {
    notify(event: Event, message: ICommonSocketMessage, sender: string): void;
}
