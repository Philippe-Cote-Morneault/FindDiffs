import { Injectable } from "@angular/core";
import { IPixel } from "../../Objects/Pixel";

@Injectable({
  providedIn: "root",
})
export class PixelRestorationService {
  private canvas: HTMLCanvasElement | null = (document.getElementById("canvasStyle")) as HTMLCanvasElement;

  public addPixel(imageData: ImageData, posX: number, posY: number): void {
    if (this.canvas) {
      const context: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
      if (context) {
        const pixel: IPixel = {
          posX: posX, posY: posY,
          r: imageData.data[0], g: imageData.data[1],
          b: imageData.data[2], a: imageData.data[3]
        };

        context.fillStyle = "rgba(" + pixel.r + "," + pixel.g + "," + pixel.b + "," + pixel.a + ")";
        context.fillRect(posX, posY, imageData.width, imageData.height);
      }
    }
  }
}
