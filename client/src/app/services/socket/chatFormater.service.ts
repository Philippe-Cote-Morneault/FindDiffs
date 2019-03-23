import { Injectable } from "@angular/core";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommonUser } from "../../../../../common/communication/webSocket/user";
import { _e, R } from "../../ressources/strings";

@Injectable({
    providedIn: "root",
})

export class ChatFormaterService {
    private static MAX_TWO_DIGITS: number = 10;

    public formatMessage(event: Event, message: ICommonSocketMessage): string {
        switch (event) {
            case Event.UserDisconnected: {
                return this.onUserDisconnected(message);
            }
            case Event.NewUser: {
                return this.onNewUser(message);
            }
            case Event.DifferenceFound: {
                return this.onDifferenceFound(message);
            }
            case Event.InvalidClick: {
                return this.onInvalidClick(message);
            }
            default: {
                return this.onDefault(event);
            }
        }
    }

    private onUserDisconnected(message: ICommonSocketMessage): string {
        return this.formatDate(message.timestamp) + _e(R.CHAT_USERDISCONNECTED, [(message.data as ICommonUser).username]);
    }

    private onNewUser(message: ICommonSocketMessage): string {
        return this.formatDate(message.timestamp) + _e(R.CHAT_USERCONNECTED, [(message.data as ICommonUser).username]);
    }

    private onDifferenceFound(message: ICommonSocketMessage): string {
        return this.formatDate(message.timestamp) + R.CHAT_DIFFERENCE_SOLO;
    }

    private onInvalidClick(message: ICommonSocketMessage): string {
        return this.formatDate(message.timestamp) + R.CHAT_ERROR_SOLO;
    }

    private onDefault(event: Event): string {
        return R.CHAT_DEFAULT + event;
    }

    private formatDate(timestamp: Date): string {
        const date: Date = new Date(timestamp);
        const hours: number | string = this.format_two_digits(date.getHours());
        const minutes: number | string = this.format_two_digits(date.getMinutes());
        const seconds: number | string = this.format_two_digits(date.getSeconds());

        return hours + R.COLON + minutes + R.COLON + seconds;
    }

    private format_two_digits(n: number): number | string {

        return n < ChatFormaterService.MAX_TWO_DIGITS ? R.ZERO + n : n;
    }
}
