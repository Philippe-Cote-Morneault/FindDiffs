import { Injectable } from "@angular/core";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommon2DPosition } from "../../../../../common/model/positions";
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
    public loadCanvas(canvas: HTMLCanvasElement, imageSrc: string): void {
        // tslint:disable-next-line: no-any
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

            const pixel: ICommon2DPosition = {
                x: e.layerX,
                y: e.layerY,
            };
            const message: ICommonSocketMessage = {
                data: pixel,
                timestamp: new Date(),
            };
            this.socket.emitMessage(Event.GameClick, message);
        }
    }

    private clickAreAllowed(): boolean {
        return !this.identificationError.getTimeout() && this.game.getGameStarted();
    }
}
