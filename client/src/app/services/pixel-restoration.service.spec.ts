import { TestBed } from "@angular/core/testing";
import * as sinon from "sinon";
import { IPixel } from "../../Objects/Pixel";
import { PixelRestorationService } from "./pixel-restoration.service";

describe("PixelRestorationService", () => {

  const pixelRestorationService: PixelRestorationService = new PixelRestorationService();

  beforeEach(() => TestBed.configureTestingModule({}));

  it("should add a pixel to the canvas", () => {
    const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    pixelRestorationService.addPixel(expectedImageData);
    expect(pixelRestorationService.context.getImageData()).toEqual(expectedImageData);
  });
});
