import { Injectable } from "@angular/core";
import { ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { _e, R } from "../../ressources/strings";

@Injectable({
    providedIn: "root",
})

export class SocketStringFormaterService {

    public onUserDisconnected(message: ICommonSocketMessage): string {
        return message.timestamp + _e(R.SOCKET_USERDISCONNECTED, [message.data]);
    }

    public onNewUser(message: ICommonSocketMessage): string {
        return message.timestamp + _e(R.SOCKET_USERCONNECTED, [message.data]);
    }

    public onDefault(): string {
        return R.SOCKET_DEFAULT;
    }
}
