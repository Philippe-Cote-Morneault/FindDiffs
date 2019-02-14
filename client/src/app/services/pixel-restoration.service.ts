import { Injectable } from "@angular/core";
import { ICommonReveal } from "../../../../common/model/reveal";

@Injectable({
    providedIn: "root",
})
export class PixelRestorationService {
    public static pixelDimension: number = 1;
    public modifiedCanvas: HTMLCanvasElement | null;
    public originalCanvas: HTMLCanvasElement | null;
    public context: CanvasRenderingContext2D | null;
    /**
     * name
     */
     // tslint:disable:no-magic-numbers

    public restoreImage(response: ICommonReveal): void {
        if (response.hit) {
            this.originalCanvas = (document.getElementById("original_canvas")) as HTMLCanvasElement;
            if (this.originalCanvas) {
                this.context = this.originalCanvas.getContext("2d");
                response.pixels_affected.forEach((element) => {
                    if (this.context) {
                        const pixel: ImageData = this.context.getImageData(
                            element.x, element.y, PixelRestorationService.pixelDimension, PixelRestorationService.pixelDimension);
                        this.addPixel(pixel, element.x, element.y);
                    }
                });
            }
        }
    }

    public addPixel(imageData: ImageData, posX: number, posY: number): void {
        this.modifiedCanvas = (document.getElementById("modified_canvas")) as HTMLCanvasElement;
        if (this.modifiedCanvas) {
            this.context = this.modifiedCanvas.getContext("2d");
            if (this.context) {
                this.context.fillStyle = "rgba(" + imageData.data[0]
                    + "," + imageData.data[1]
                    + "," + imageData.data[2]
                    + "," + imageData.data[3] + ")";
                this.context.fillRect(posX, posY, imageData.width, imageData.height);
            }
        }
    }
}
