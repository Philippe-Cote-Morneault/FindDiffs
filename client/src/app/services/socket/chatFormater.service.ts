import { Injectable } from "@angular/core";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { _e, R } from "../../ressources/strings";

@Injectable({
    providedIn: "root",
})

export class ChatFormaterService {

    public formatMessage(event: Event, message: ICommonSocketMessage): string {
        switch (event) {
            case Event.UserDisconnected: {
                return this.onUserDisconnected(message);
            }
            case Event.NewUser: {
                return this.onNewUser(message);
            }
            default: {
                return this.onDefault(event);
            }
        }
    }

    private onUserDisconnected(message: ICommonSocketMessage): string {
        return message.timestamp + _e(R.CHAT_USERDISCONNECTED, [message.data]);
    }

    private onNewUser(message: ICommonSocketMessage): string {
        return message.timestamp + _e(R.CHAT_USERCONNECTED, [message.data]);
    }

    private onDefault(event: Event): string {
        return R.CHAT_DEFAULT + event;
    }
}
