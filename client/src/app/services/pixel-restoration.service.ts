import { Injectable } from "@angular/core";
import { IPixel } from "../../Objects/Pixel";

@Injectable({
    providedIn: "root",
})
export class PixelRestorationService {
    public modifiedCanvas: HTMLCanvasElement | null = (document.getElementById("modified_canvas")) as HTMLCanvasElement;
    public originalCanvas: HTMLCanvasElement | null = (document.getElementById("original_canvas")) as HTMLCanvasElement;
    public context: CanvasRenderingContext2D | null;
    public pixelDimension: number = 1;
    /**
     * name
     */
    public restoreImage(pixelAffected: number[]): void {
        if (this.originalCanvas) {
            this.context = this.originalCanvas.getContext("2d");
            pixelAffected.forEach((element) => {
                if (this.context) {
                // const pixel: ImageData = this.context.getImageData(element.x, element.y, this.pixelDimension, this.pixelDimension);
                // this.addPixel(pixel, element.x, element.y);
                }
            });
        }
    }

    public addPixel(imageData: ImageData, posX: number, posY: number): void {

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
