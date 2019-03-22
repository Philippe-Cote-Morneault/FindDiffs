import { TestBed } from "@angular/core/testing";
import * as sinon from "sinon";
import { ICommon2DPosition } from "../../../../../common/model/positions";
import { ICommonReveal } from "../../../../../common/model/reveal";
import { PixelRestoration } from "./pixelRestoration";

// tslint:disable no-magic-numbers

describe("PixelRestoration", () => {

  const pixelRestoration: PixelRestoration = new PixelRestoration();
  let originalCanvas: HTMLCanvasElement;
  let originalContext: CanvasRenderingContext2D | null;
  let modifiedCanvas: HTMLCanvasElement;
  let modifiedContext: CanvasRenderingContext2D | null;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    originalCanvas  = (document.createElement("canvas") as HTMLCanvasElement);
    originalContext = originalCanvas.getContext("2d");

    modifiedCanvas = (document.createElement("canvas") as HTMLCanvasElement);
    modifiedContext = modifiedCanvas.getContext("2d");

  });

  it("should add a pixel to the canvas", () => {

    const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    if (originalContext) {
      originalContext.putImageData(expectedImageData, 0, 0);
    }
    const posPixel: ICommon2DPosition = {x: 0, y: 0};
    const responseServer: ICommonReveal = {hit: true, pixels_affected: [posPixel], difference_id: 1};
    pixelRestoration.restoreImage(responseServer, originalCanvas, modifiedCanvas);
    expect(modifiedCanvas.toDataURL()).toEqual(originalCanvas.toDataURL());

  });

  it("should add a black pixel to the canvas", () => {

    const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    if (originalContext) {
      originalContext.putImageData(expectedImageData, 0, 0);
    }
    const posPixel: ICommon2DPosition = {x: 0, y: 0};
    const responseServer: ICommonReveal = {hit: true, pixels_affected: [posPixel], difference_id: 1};
    pixelRestoration.restoreImage(responseServer, originalCanvas, modifiedCanvas);
    expect(modifiedCanvas.toDataURL()).toEqual(originalCanvas.toDataURL());

  });

  it("should add a red pixel to the canvas", () => {

    const data: Uint8ClampedArray = new Uint8ClampedArray([255, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    if (originalContext) {
      originalContext.putImageData(expectedImageData, 0, 0);
    }
    const posPixel: ICommon2DPosition = {x: 0, y: 0};
    const responseServer: ICommonReveal = {hit: true, pixels_affected: [posPixel], difference_id: 1};
    pixelRestoration.restoreImage(responseServer, originalCanvas, modifiedCanvas);

    expect(modifiedCanvas.toDataURL()).toEqual(originalCanvas.toDataURL());

  });

  it("should add multiple red pixels to the canvas", () => {
    const data: Uint8ClampedArray = new Uint8ClampedArray([255, 0, 0, 255,
                                                           255, 0, 0, 255,
                                                           255, 0, 0, 255,
                                                           255, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 4, 1);

    if (modifiedContext && originalContext) {
      originalContext.putImageData(expectedImageData, 0, 0);
    }

    const posPixel: ICommon2DPosition[] = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}];
    const responseServer: ICommonReveal = {hit: true, pixels_affected: posPixel, difference_id: 1};
    pixelRestoration.restoreImage(responseServer, originalCanvas, modifiedCanvas);

    expect(modifiedCanvas.toDataURL()).toEqual(originalCanvas.toDataURL());
  });

  it("should not add a pixel because originalContext is null", () => {
    const stub: sinon.SinonStub = sinon.stub(originalCanvas, "getContext");
    stub.returns(null);

    const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    if (originalContext) {
      originalContext.putImageData(expectedImageData, 0, 0);
    }
    const posPixel: ICommon2DPosition = {x: 0, y: 0};
    const responseServer: ICommonReveal = {hit: true, pixels_affected: [posPixel], difference_id: 1};
    pixelRestoration.restoreImage(responseServer, originalCanvas, modifiedCanvas);
    expect(modifiedCanvas.toDataURL()).not.toEqual(originalCanvas.toDataURL());
    stub.restore();
  });

  it("should not add a pixel because modifiedContext is null", () => {
    const stub: sinon.SinonStub = sinon.stub(modifiedCanvas, "getContext");
    stub.returns(null);

    const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    if (originalContext) {
      originalContext.putImageData(expectedImageData, 0, 0);
    }
    const posPixel: ICommon2DPosition = {x: 0, y: 0};
    const responseServer: ICommonReveal = {hit: true, pixels_affected: [posPixel], difference_id: 1};
    pixelRestoration.restoreImage(responseServer, originalCanvas, modifiedCanvas);
    expect(modifiedCanvas.toDataURL()).not.toEqual(originalCanvas.toDataURL());
    stub.restore();
  });
});
