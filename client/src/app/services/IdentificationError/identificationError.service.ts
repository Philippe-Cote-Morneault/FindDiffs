import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class IdentificationError {
    private static ONE_SECOND: number = 1000;
    public timeout: boolean;

    public constructor() {
        this.timeout = false;
    }

    public showErrorMessage(xPosition: number, yPosition: number,
                            errorMessage: HTMLElement, original: HTMLElement, modified: HTMLElement ): void {
        this.timeout = true;
        this.moveClickError(xPosition, yPosition, errorMessage);
        this.showClickError(errorMessage, original, modified);

        setTimeout(() => {
            this.hideClickError(errorMessage, original, modified);
            this.timeout = false;
                }, IdentificationError.ONE_SECOND);
    }

    private moveClickError(xPosition: number, yPosition: number, errorMessage: HTMLElement): void {
        errorMessage.style.top = yPosition + "px";
        errorMessage.style.left = xPosition + "px";
    }

    private showClickError(errorMessage: HTMLElement, original: HTMLElement, modified: HTMLElement): void {
        errorMessage.style.display = "inline";
        original.style.cursor = "not-allowed";
        modified.style.cursor = "not-allowed";
        errorMessage.style.cursor = "not-allowed";
    }

    private hideClickError(errorMessage: HTMLElement, original: HTMLElement, modified: HTMLElement): void {
        errorMessage.style.display = "none";
        original.style.cursor = "context-menu";
        modified.style.cursor = "context-menu";
        errorMessage.style.cursor = "context-menu";
    }
}
