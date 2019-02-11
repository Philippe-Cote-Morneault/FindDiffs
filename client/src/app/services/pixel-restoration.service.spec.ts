import { TestBed } from "@angular/core/testing";
import * as sinon from "sinon";
/*import { IPixel } from "../../Objects/Pixel";*/
import { PixelRestorationService } from "./pixel-restoration.service";

// tslint:disable no-magic-numbers

describe("PixelRestorationService", () => {

  const pixelRestorationService: PixelRestorationService = new PixelRestorationService();

  beforeEach(() => TestBed.configureTestingModule({}));

  it("should have no pixels", () => {
      const blankCanvas: HTMLCanvasElement = (document.createElement("canvas") as HTMLCanvasElement);
      if (pixelRestorationService.modifiedCanvas) {
        expect(pixelRestorationService.modifiedCanvas.toDataURL()).toEqual(blankCanvas.toDataURL());
      }
  });

  it("should call fillRect method once", () => {
    if (pixelRestorationService.context) {
      const spy: sinon.SinonSpy = sinon.spy(pixelRestorationService.context, "fillRect");
      const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255]);
      const expectedImageData: ImageData = new ImageData(data, 1, 1);
      pixelRestorationService.addPixel(expectedImageData, 0, 0);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(0, 0, 1, 1);
      spy.restore();
    }
  });
  it("should add a pixel to the canvas", () => {
    const blankCanvas: HTMLCanvasElement = (document.createElement("canvas") as HTMLCanvasElement);

    const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    pixelRestorationService.addPixel(expectedImageData, 0, 0);

    if (pixelRestorationService.modifiedCanvas) {
      expect(pixelRestorationService.modifiedCanvas.toDataURL()).toBeFalsy(blankCanvas.toDataURL());
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

  it("should add a red pixel to the canvas", () => {
    const data: Uint8ClampedArray = new Uint8ClampedArray([255, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    pixelRestorationService.addPixel(expectedImageData, 0, 0);

    if (pixelRestorationService.context) {
      expect(pixelRestorationService.context.getImageData(0, 0, 1, 1)).toEqual(expectedImageData);
    }
  });

  it("should add multiple black pixels to the canvas", () => {
    const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255,
                                                           0, 0, 0, 255,
                                                           0, 0, 0, 255,
                                                           0, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 4, 1);
    pixelRestorationService.addPixel(expectedImageData, 0, 0);
    if (pixelRestorationService.context) {
      expect(pixelRestorationService.context.getImageData(0, 0, 4, 1)).toEqual(expectedImageData);
    }
  });

  it("should add multiple red pixels to the canvas", () => {
    const data: Uint8ClampedArray = new Uint8ClampedArray([255, 0, 0, 255,
                                                           255, 0, 0, 255,
                                                           255, 0, 0, 255,
                                                           255, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 4, 1);
    pixelRestorationService.addPixel(expectedImageData, 0, 0);
    if (pixelRestorationService.context) {
      expect(pixelRestorationService.context.getImageData(0, 0, 4, 1)).toEqual(expectedImageData);
    }
  });
});