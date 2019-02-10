import { TestBed } from "@angular/core/testing";
/*import * as sinon from "sinon";
import { IPixel } from "../../Objects/Pixel";*/
import { PixelRestorationService } from "./pixel-restoration.service";

describe("PixelRestorationService", () => {

  const pixelRestorationService: PixelRestorationService = new PixelRestorationService();

  beforeEach(() => TestBed.configureTestingModule({}));

  it("should have no pixels", () => {
      const blankCanvas: HTMLCanvasElement = (document.createElement("canvas") as HTMLCanvasElement);
      if (pixelRestorationService.canvas) {
        expect(pixelRestorationService.canvas.toDataURL).toEqual(blankCanvas.toDataURL);
      }
  });

  it("should add a black pixel to the canvas", () => {
    const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    pixelRestorationService.addPixel(expectedImageData, 0, 0);
    if (pixelRestorationService.context) {
          expect(pixelRestorationService.context.getImageData(0, 0, 1, 1)).toEqual(expectedImageData);
    }
  });

  it("should add multiple black pixels to the canvas", () => {
    const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255,
                                                          0, 0, 0 , 255,
                                                          0, 0, 0, 255,
                                                          0, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 4, 1);
    pixelRestorationService.addPixel(expectedImageData, 0, 0);
    if (pixelRestorationService.context) {
          expect(pixelRestorationService.context.getImageData(0, 0, 4, 1)).toEqual(expectedImageData);
    }
  });
});
