import { Injectable } from "@angular/core";
import { ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { _e, R } from "../../ressources/strings";

@Injectable({
    providedIn: "root",
})

export class SocketStringFormaterService {

    public messageFormater(messageType: string, message: ICommonSocketMessage): string {
        switch (messageType) {
            case "UserDisconnected": {
                return this.onUserDisconnected(message);
            }
            case "NewUser": {
               return this.onNewUser(message);
            }
            default: {
                return this.onDefault();
             }
         }
    }

    private onUserDisconnected(message: ICommonSocketMessage): string {
        return message.timestamp + _e(R.SOCKET_USERDISCONNECTED, [message.data]);
    }

    private onNewUser(message: ICommonSocketMessage): string {
        return message.timestamp + _e(R.SOCKET_USERCONNECTED, [message.data]);
    }

    private onDefault(): string {
        return R.SOCKET_DEFAULT;
    }
}
