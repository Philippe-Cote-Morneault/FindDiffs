import { Injectable } from "@angular/core";
import { Event } from "../../../../../common/communication/webSocket/socketMessage";
import { R } from "../../ressources/strings";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class IdentificationError implements SocketSubscriber {
    private static readonly ERROR_SOUND_SRC: string = "../../assets/no.mp3";
    private static readonly ONE_SECOND: number = 1000;
    private errorMessage: HTMLElement;
    private original: HTMLElement;
    private modified: HTMLElement;

    public timeout: boolean;
    private errorSound: HTMLAudioElement;

    public constructor(private socketService: SocketHandlerService ) {
        this.timeout = false;
        this.errorSound = new Audio;
        this.errorSound.src = IdentificationError.ERROR_SOUND_SRC;
        this.errorSound.load();
        this.subscribeToSocket();
    }

    public setContainers(errorMessage: HTMLElement, original: HTMLElement, modified: HTMLElement): void {
        this.errorMessage = errorMessage;
        this.original = original;
        this.modified = modified;
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.InvalidClick, this);
    }

    public notify(event: Event): void {
        if (event === Event.InvalidClick) {
            this.showErrorMessage();
        }
    }

    public async showErrorMessage(): Promise<void> {
        this.timeout = true;
        this.showClickError();
        await this.errorSound.play();
        setTimeout(() => {
            this.hideClickError();
            this.timeout = false;
                }, IdentificationError.ONE_SECOND);
    }

    public moveClickError(xPosition: number, yPosition: number): void {
        this.errorMessage.style.top = yPosition + R.PIXEL;
        this.errorMessage.style.left = xPosition + R.PIXEL;
    }

    private showClickError(): void {
        this.errorMessage.style.display = R.INLINE;
        this.original.style.cursor = R.NOT_ALLOWED;
        this.modified.style.cursor = R.NOT_ALLOWED;
        this.errorMessage.style.cursor = R.NOT_ALLOWED;
    }

    private hideClickError(): void {
        this.errorMessage.style.display = R.NONE;
        this.original.style.cursor = R.CONTEXT_MENU;
        this.modified.style.cursor = R.CONTEXT_MENU;
        this.errorMessage.style.cursor = R.CONTEXT_MENU;
    }
}
