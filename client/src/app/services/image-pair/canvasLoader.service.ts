import { Injectable } from "@angular/core";
import { IdentificationError } from "../IdentificationError/identificationError.service";
import { GameService } from "../game/game.service";
import { SocketHandlerService } from "../socket/socketHandler.service";

@Injectable({
    providedIn: "root",
})
export class CanvasLoaderService {
    private static readonly ANONYMOUS: string = "Anonymous";

    public constructor(private identificationError: IdentificationError,
                       private socket: SocketHandlerService,
                       private game: GameService) {}
    // tslint:disable:no-any
    public loadCanvas(canvas: any, imageSrc: string): void {
        canvas.addEventListener("click", (e: any) => this.getClickPosition(e));
        const canvasContext: CanvasRenderingContext2D | null = canvas.getContext("2d");
        const image: HTMLImageElement = new Image();
        image.crossOrigin = CanvasLoaderService.ANONYMOUS;
        image.src = imageSrc;
        image.onload = () => {
            if (canvasContext) {
                canvasContext.drawImage(image, 0, 0);
            }
        };
    }

    // tslint:disable-next-line:no-any
    private getClickPosition(e: any): void {
        if (this.clickAreAllowed()) {
            this.identificationError.moveClickError(e.pageX, e.pageY);
            this.socket.emitClick(e.layerX, e.layerY);
        }
    }

    private clickAreAllowed(): boolean {
        return !this.identificationError.timeout && this.game.gameStarted;
    }
}
