import { Injectable } from "@angular/core";
import { R } from "src/app/ressources/strings";
import { ICommonGameEnding } from "../../../../../common/communication/webSocket/gameEnding";
import { ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";

@Injectable({
    providedIn: "root",
})
export class PlayerTimeService {
    private static readonly MAX_TWO_DIGITS: number = 10;
    private static readonly MS_IN_SEC: number = 1000;
    private static readonly SEC_IN_MIN: number = 60;

    public formatPlayerTimer(message: ICommonSocketMessage): string {
        let seconds: number | string =  (message.data as ICommonGameEnding).time / PlayerTimeService.MS_IN_SEC;

        // tslint:disable:radix
        const minutes: number | string = this.format_two_digits(Math.floor(seconds / PlayerTimeService.SEC_IN_MIN));
        seconds = this.format_two_digits(Math.round(seconds % PlayerTimeService.SEC_IN_MIN));

        return minutes + R.COLON + seconds;
    }

    private format_two_digits(n: number): number | string {

        return n < PlayerTimeService.MAX_TWO_DIGITS ? R.ZERO + n : n;
    }
}
