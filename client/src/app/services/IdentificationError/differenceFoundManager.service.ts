import { Injectable } from "@angular/core";
import { R } from "src/app/ressources/strings";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommonReveal } from "../../../../../common/model/reveal";
import { PixelRestoration } from "../pixelManipulation/pixel-restoration";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class DifferenceFoundManager implements SocketSubscriber {
    private differenceFound: number[];
    private differenceSound: HTMLAudioElement;
    private differenceCounterUser: number;

    public constructor(public pixelRestoration: PixelRestoration, differenceCounterUser: number) {
        this.differenceCounterUser = differenceCounterUser;
        this.differenceSound = new Audio;
        this.differenceSound.src = R.DIFFERENCE_SOUND_SRC;
        this.differenceFound = [];
    }

    public subscribeToSocket(): void {
        SocketHandlerService.getInstance().subscribe(Event.DifferenceFound, this);
    }

    public async notify(event: Event, message: ICommonSocketMessage): Promise<void> {
        if (event === Event.DifferenceFound) {
            const response: ICommonReveal = message.data as ICommonReveal;
            if (this.isANewDifference(response.difference_id)) {
                this.pixelRestoration.restoreImage(response);
                await this.addDifference(response.difference_id);
            }
        }
    }

    private async addDifference(differenceId: number): Promise<void> {
        this.differenceFound[this.differenceFound.length++] = differenceId;
        this.differenceCounterUser = this.differenceCounterUser + 1;
        await this.differenceSound.play();
    }

    private isANewDifference(differenceId: number): boolean {

        return !this.differenceFound.includes(differenceId);
    }
}
