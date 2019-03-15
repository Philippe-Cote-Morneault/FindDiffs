import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class IdentificationError {
    private static readonly ERROR_SOUND_SRC: string = "../../assets/no.mp3";
    private static readonly ONE_SECOND: number = 1000;
    private static readonly PIXEL: string = "px";
    private static readonly INLINE: string = "inline";
    private static readonly NONE: string = "none";
    private static readonly NOT_ALLOWED: string = "not-allowed";
    private static readonly CONTEXT_MENU: string = "context-menu";

    public timeout: boolean;
    private errorSound: HTMLAudioElement;

    public constructor() {
        this.timeout = false;
        this.errorSound = new Audio;
        this.errorSound.src = IdentificationError.ERROR_SOUND_SRC;
        this.errorSound.load();
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
        errorMessage.style.top = yPosition + IdentificationError.PIXEL;
        errorMessage.style.left = xPosition + IdentificationError.PIXEL;
    }

    private showClickError(errorMessage: HTMLElement, original: HTMLElement, modified: HTMLElement): void {
        errorMessage.style.display = IdentificationError.INLINE;
        original.style.cursor = IdentificationError.NOT_ALLOWED;
        modified.style.cursor = IdentificationError.NOT_ALLOWED;
        errorMessage.style.cursor = IdentificationError.NOT_ALLOWED;
    }

    private hideClickError(errorMessage: HTMLElement, original: HTMLElement, modified: HTMLElement): void {
        errorMessage.style.display = IdentificationError.NONE;
        original.style.cursor = IdentificationError.CONTEXT_MENU;
        modified.style.cursor = IdentificationError.CONTEXT_MENU;
        errorMessage.style.cursor = IdentificationError.CONTEXT_MENU;
    }
}
