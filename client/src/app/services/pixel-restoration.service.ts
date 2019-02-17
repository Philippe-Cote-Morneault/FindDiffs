import { Injectable } from "@angular/core";
import { ICommon2DPosition } from "../../../../common/model/positions";
import { ICommonReveal } from "../../../../common/model/reveal";
import { RgbaPosition } from "../models/pixelProperties/color";

@Injectable({
    providedIn: "root",
})
export class PixelRestorationService {
    public static pixelDimension: number = 1;
    public static imageDataPixelSpace: number = 4;
    public originalContext: CanvasRenderingContext2D | null;
    public modifiedContext: CanvasRenderingContext2D | null;
    /**
     * name
     */
    // tslint:disable:no-magic-numbers

    public restoreImage(response: ICommonReveal,
                        originalCanvas: HTMLCanvasElement | null,
                        modifiedCanvas: HTMLCanvasElement | null): void {

        if (originalCanvas) {
            this.originalContext = originalCanvas.getContext("2d");
            if (this.originalContext) {
                const imageData: ImageData =
                    this.originalContext.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
                if (modifiedCanvas) {
                    this.modifiedContext = modifiedCanvas.getContext("2d");
                    if (this.modifiedContext) {
                        const imageData2: ImageData =
                            this.modifiedContext.getImageData(0, 0, modifiedCanvas.width, modifiedCanvas.height);
                        let pos: number;
                        response.pixels_affected.forEach((element) => {
                            pos = this.pixelPositionInImageData(element, originalCanvas.width);
                            imageData2.data[pos + RgbaPosition.R] = imageData.data[pos + RgbaPosition.R];
                            imageData2.data[pos + RgbaPosition.G] = imageData.data[pos + RgbaPosition.G];
                            imageData2.data[pos + RgbaPosition.B] = imageData.data[pos + RgbaPosition.B];
                            imageData2.data[pos + RgbaPosition.A] = imageData.data[pos + RgbaPosition.A];

                        });
                        this.modifiedContext.putImageData(imageData2, 0, 0);
                    }
                }
            }
        }
    }

    public pixelPositionInImageData(pos: ICommon2DPosition, width: number): number {
        return ((width * pos.y - 1 + pos.x) * PixelRestorationService.imageDataPixelSpace);
    }
}
