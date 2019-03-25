import { TestBed } from "@angular/core/testing";
import { _MatChipListMixinBase } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import * as sinon from "sinon";
import { ICommonDifferenceFound } from "../../../../../common/communication/webSocket/differenceFound";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommon2DPosition } from "../../../../../common/model/positions";
import { PixelRestoration } from "./pixelRestoration";

// tslint:disable no-magic-numbers

describe("PixelRestoration", () => {

  let pixelRestoration: PixelRestoration;
  let originalCanvas: HTMLCanvasElement;
  let originalContext: CanvasRenderingContext2D | null;
  let modifiedCanvas: HTMLCanvasElement;
  let modifiedContext: CanvasRenderingContext2D | null;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    pixelRestoration = TestBed.get(PixelRestoration);
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
    const responseServer: ICommonDifferenceFound = {
      player: "Daddy",
      difference_count: 1,
      reveal: {hit: true, pixels_affected: [posPixel], difference_id: 1},
    };
    const msg: ICommonSocketMessage = { data: responseServer, timestamp: new Date()};
    pixelRestoration.setContainers(originalCanvas, modifiedCanvas);
    pixelRestoration.notify(Event.DifferenceFound, msg);
    expect(modifiedCanvas.toDataURL()).toEqual(originalCanvas.toDataURL());

  });

  it("should add a black pixel to the canvas", () => {

    const data: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    if (originalContext) {
      originalContext.putImageData(expectedImageData, 0, 0);
    }
    const posPixel: ICommon2DPosition = {x: 0, y: 0};
    const responseServer: ICommonDifferenceFound = {
      player: "Daddy",
      difference_count: 1,
      reveal: {hit: true, pixels_affected: [posPixel], difference_id: 1},
    };
    const msg: ICommonSocketMessage = { data: responseServer, timestamp: new Date()};
    pixelRestoration.setContainers(originalCanvas, modifiedCanvas);
    pixelRestoration.notify(Event.DifferenceFound, msg);
    expect(modifiedCanvas.toDataURL()).toEqual(originalCanvas.toDataURL());

  });

  it("should add a red pixel to the canvas", () => {

    const data: Uint8ClampedArray = new Uint8ClampedArray([255, 0, 0, 255]);
    const expectedImageData: ImageData = new ImageData(data, 1, 1);
    if (originalContext) {
      originalContext.putImageData(expectedImageData, 0, 0);
    }
    const posPixel: ICommon2DPosition = {x: 0, y: 0};
    const responseServer: ICommonDifferenceFound = {
      player: "Daddy",
      difference_count: 1,
      reveal: {hit: true, pixels_affected: [posPixel], difference_id: 1},
    };
    const msg: ICommonSocketMessage = { data: responseServer, timestamp: new Date()};
    pixelRestoration.setContainers(originalCanvas, modifiedCanvas);
    pixelRestoration.notify(Event.DifferenceFound, msg);

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
    const responseServer: ICommonDifferenceFound = {
      player: "Daddy",
      difference_count: 4,
      reveal: {hit: true, pixels_affected: posPixel, difference_id: 1},
    };
    const msg: ICommonSocketMessage = { data: responseServer, timestamp: new Date()};
    pixelRestoration.setContainers(originalCanvas, modifiedCanvas);
    pixelRestoration.notify(Event.DifferenceFound, msg);

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
    const responseServer: ICommonDifferenceFound = {
      player: "Daddy",
      difference_count: 1,
      reveal: {hit: true, pixels_affected: [posPixel], difference_id: 1},
    };
    const msg: ICommonSocketMessage = { data: responseServer, timestamp: new Date()};
    pixelRestoration.setContainers(originalCanvas, modifiedCanvas);
    pixelRestoration.notify(Event.DifferenceFound, msg);
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
    const responseServer: ICommonDifferenceFound = {
      player: "Daddy",
      difference_count: 1,
      reveal: {hit: true, pixels_affected: [posPixel], difference_id: 1},
    };
    const msg: ICommonSocketMessage = { data: responseServer, timestamp: new Date()};
    pixelRestoration.setContainers(originalCanvas, modifiedCanvas);
    pixelRestoration.notify(Event.DifferenceFound, msg);
    expect(modifiedCanvas.toDataURL()).not.toEqual(originalCanvas.toDataURL());
    stub.restore();
  });
});
