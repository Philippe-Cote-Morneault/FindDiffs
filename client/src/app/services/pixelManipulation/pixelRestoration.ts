import { Injectable } from "@angular/core";
import { ICommonDifferenceFound } from "../../../../../common/communication/webSocket/differenceFound";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommon2DPosition } from "../../../../../common/model/positions";
import { RgbaPosition } from "../../models/pixelProperties/color";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class PixelRestoration  implements SocketSubscriber {
    public static pixelDimension: number = 1;
    public static imageDataPixelSpace: number = 4;
    public originalContext: CanvasRenderingContext2D | null;
    public modifiedContext: CanvasRenderingContext2D | null;
    private originalCanvas: HTMLCanvasElement;
    private modifiedCanvas: HTMLCanvasElement;

    public constructor(private socketService: SocketHandlerService) {
        this.subscribeToSocket();
    }

    public setContainers(originalCanvas: HTMLCanvasElement, modifiedCanvas: HTMLCanvasElement): void {
        this.originalCanvas = originalCanvas;
        this.modifiedCanvas = modifiedCanvas;
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.DifferenceFound, this);
    }

    public notify(event: Event, message: ICommonSocketMessage): void {
        if (event === Event.DifferenceFound) {
            const response: ICommonDifferenceFound = message.data as ICommonDifferenceFound;
            this.restoreImage(response);
        }
    }

    public restoreImage(response: ICommonDifferenceFound): void {
        this.originalContext = this.originalCanvas.getContext("2d");
        if (this.originalContext) {
            const originalImageData: ImageData = this.originalContext.getImageData(
                0, 0, this.originalCanvas.width, this.originalCanvas.height);
            this.modifiedContext = this.modifiedCanvas.getContext("2d");
            if (this.modifiedContext) {
                const modifiedImageData: ImageData = this.modifiedContext.getImageData(
                    0, 0, this.modifiedCanvas.width, this.modifiedCanvas.height);
                let pos: number;
                response.pixels_affected.forEach((pixel) => {
                    pos = this.pixelPositionInImageData(pixel, this.originalCanvas.width);
                    this.changePixelColor(pos, originalImageData, modifiedImageData);
                });
                this.modifiedContext.putImageData(modifiedImageData, 0, 0);
            }

        }
    }
    private changePixelColor(pos: number, originalImageData: ImageData, modifiedImageData: ImageData): void {
        modifiedImageData.data[pos + RgbaPosition.R] = originalImageData.data[pos + RgbaPosition.R];
        modifiedImageData.data[pos + RgbaPosition.G] = originalImageData.data[pos + RgbaPosition.G];
        modifiedImageData.data[pos + RgbaPosition.B] = originalImageData.data[pos + RgbaPosition.B];
        modifiedImageData.data[pos + RgbaPosition.A] = originalImageData.data[pos + RgbaPosition.A];
    }

    private pixelPositionInImageData(pos: ICommon2DPosition, width: number): number {
        return ((width * pos.y + pos.x) * PixelRestoration.imageDataPixelSpace);
    }
}
