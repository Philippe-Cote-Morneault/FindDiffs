import { Injectable } from "@angular/core";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { R } from "../../ressources/strings";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class IdentificationError implements SocketSubscriber {
    private static instance: IdentificationError;
    private static readonly ERROR_SOUND_SRC: string = "../../assets/no.mp3";
    private static readonly ONE_SECOND: number = 1000;
    private errorMessage: HTMLElement;
    private original: HTMLElement;
    private modified: HTMLElement;

    public timeout: boolean;
    private errorSound: HTMLAudioElement;

    public static getInstance(): IdentificationError {
        if (!IdentificationError.instance) {
            IdentificationError.instance = new IdentificationError();
        }

        return IdentificationError.instance;
    }

    public constructor() {
        this.timeout = false;
        this.errorSound = new Audio;
        this.errorSound.src = IdentificationError.ERROR_SOUND_SRC;
        this.errorSound.load();
        this.subscribeToSocket();
    }

    private subscribeToSocket(): void {
        SocketHandlerService.getInstance().subscribe(Event.InvalidClick, this);
    }

    public notify(event: Event, message: ICommonSocketMessage): void {
        // Call showErrorMessage
        // tslint:disable-next-line:no-console
        console.log(event + message + this.errorMessage + this.original + this.modified);
    }

    public setIdentificationError(errorMessage: HTMLElement, original: HTMLElement, modified: HTMLElement): void {
        this.errorMessage = errorMessage;
        this.original = original;
        this.modified = modified;
    }

    public async showErrorMessage(xPosition: number, yPosition: number,
                                  errorMessage: HTMLElement, original: HTMLElement, modified: HTMLElement ): Promise<void> {
        this.timeout = true;
        this.moveClickError(xPosition, yPosition, errorMessage);
        this.showClickError(errorMessage, original, modified);
        await this.errorSound.play();

        setTimeout(() => {
            this.hideClickError(errorMessage, original, modified);
            this.timeout = false;
                }, IdentificationError.ONE_SECOND);
    }

    private moveClickError(xPosition: number, yPosition: number, errorMessage: HTMLElement): void {
        errorMessage.style.top = yPosition + R.PIXEL;
        errorMessage.style.left = xPosition + R.PIXEL;
    }

    private showClickError(errorMessage: HTMLElement, original: HTMLElement, modified: HTMLElement): void {
        errorMessage.style.display = R.INLINE;
        original.style.cursor = R.NOT_ALLOWED;
        modified.style.cursor = R.NOT_ALLOWED;
        errorMessage.style.cursor = R.NOT_ALLOWED;
    }

    private hideClickError(errorMessage: HTMLElement, original: HTMLElement, modified: HTMLElement): void {
        errorMessage.style.display = R.NONE;
        original.style.cursor = R.CONTEXT_MENU;
        modified.style.cursor = R.CONTEXT_MENU;
        errorMessage.style.cursor = R.CONTEXT_MENU;
    }
}
