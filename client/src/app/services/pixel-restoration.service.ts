import { Injectable } from "@angular/core";
import { IPixel } from "../../Objects/Pixel";

@Injectable({
  providedIn: "root",
})
export class PixelRestorationService {
  public canvas: HTMLCanvasElement | null = (document.getElementById("canvas")) as HTMLCanvasElement;
  public context: CanvasRenderingContext2D | null;

  public addPixel(imageData: ImageData, posX: number, posY: number): void {

    if (this.canvas) {
      this.context = this.canvas.getContext("2d");
      if (this.context) {
        const pixel: IPixel = {
          posX: posX,
          posY: posY,
          r: imageData.data[0],
          g: imageData.data[1],
          b: imageData.data[2],
          a: imageData.data[3]
        };

        this.context.fillStyle = "rgba(" + pixel.r + "," + pixel.g + "," + pixel.b + "," + pixel.a + ")";
        this.context.fillRect(posX, posY, imageData.width, imageData.height);
      }
    }
  }
}
