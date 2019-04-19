import { ElementRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import * as THREE from "three";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { ObjectHandler } from "./objects-handler.service";

describe("ObjectHandler", () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
  });

  // tslint:disable:no-any
  // tslint:disable:no-magic-numbers
  describe("clickAreAllowed()", () => {
    it("should return true", async () => {
      const service: ObjectHandler = TestBed.get(ObjectHandler);
      spyOn<any>(service["identificationError"], "getTimeout").and.returnValue(false);
      spyOn<any>(service["game"], "getGameStarted").and.returnValue(true);

      const returnValue: boolean = service["clickAreAllowed"]();

      await expect(returnValue).toEqual(true);
    });

    it("should return false", async () => {
      const service: ObjectHandler = TestBed.get(ObjectHandler);
      spyOn<any>(service["identificationError"], "getTimeout").and.returnValue(true);
      spyOn<any>(service["game"], "getGameStarted").and.returnValue(true);

      const returnValue: boolean = service["clickAreAllowed"]();

      await expect(returnValue).toEqual(false);
    });
  });

  describe("emitDifference()", () => {
    it("should call the emitDifference function for the geometric scene", async () => {
      const service: ObjectHandler = TestBed.get(ObjectHandler);

      const scenePairId: string = "6546464";
      const originalObjectId: string = "6546565465dd";
      const modifiedObjectId: string = "asasd334";
      const gameType: ObjectType = ObjectType.Geometric;

      spyOn<any>(service["socket"], "emitMessage");

      service["emitDifference"](scenePairId, originalObjectId, modifiedObjectId, gameType);

      await expect(service["socket"].emitMessage).toHaveBeenCalled();
    });

    it("should call the emitDifference function for the thematic scene", async () => {
      const service: ObjectHandler = TestBed.get(ObjectHandler);

      const scenePairId: string = "6546464";
      const originalObjectId: string = "6546565465dd";
      const modifiedObjectId: string = "asasd334";
      const gameType: ObjectType = ObjectType.Thematic;

      spyOn<any>(service["socket"], "emitMessage");

      service["emitDifference"](scenePairId, originalObjectId, modifiedObjectId, gameType);

      await expect(service["socket"].emitMessage).toHaveBeenCalled();
    });
  });

  describe("clickOnScene()", () => {
    it("should call the moveClickError function", async () => {
      const service: ObjectHandler = TestBed.get(ObjectHandler);

      const event: MouseEvent = document.createEvent("MouseEvent");
      event.initMouseEvent("click", true, true, window, 0, 80, 50, 371, 207, false, false, false, false, 0, null);
      const originalScene: ElementRef<HTMLElement> = new ElementRef<HTMLElement>(document.createElement("HTMLElement"));
      const modifiedScene: ElementRef<HTMLElement> = new ElementRef<HTMLElement>(document.createElement("HTMLElement"));

      service.originalGame = originalScene;
      service.modifiedGame = modifiedScene;

      spyOn<any>(service, "clickAreAllowed").and.returnValue(true);
      spyOn<any>(service["identificationError"], "moveClickError");

      await service.clickOnScene(event, true);
      await expect(service["identificationError"].moveClickError).toHaveBeenCalled();
    });
  });

  describe("adjustMouse()", () => {
    it("Should call setMousePosition function", async () => {
      const service: ObjectHandler = TestBed.get(ObjectHandler);

      const event: MouseEvent = document.createEvent("MouseEvent");
      event.initMouseEvent("click", true, true, window, 0, 80, 50, 371, 207, false, false, false, false, 0, null);
      const mouse: THREE.Vector2 = new THREE.Vector2();

      const originalScene: ElementRef<HTMLElement> = new ElementRef<HTMLElement>(document.createElement("HTMLElement"));
      const modifiedScene: ElementRef<HTMLElement> = new ElementRef<HTMLElement>(document.createElement("HTMLElement"));

      service.originalGame = originalScene;
      service.modifiedGame = modifiedScene;

      spyOn<any>(service["mousePositionService"], "setMousePosition");
      service["adjustMouse"](false, event, mouse);

      await expect(service["mousePositionService"].setMousePosition).toHaveBeenCalled();
    });

    it("Should call setMousePosition function", async () => {
      const service: ObjectHandler = TestBed.get(ObjectHandler);

      const event: MouseEvent = document.createEvent("MouseEvent");
      event.initMouseEvent("click", true, true, window, 0, 80, 50, 371, 207, false, false, false, false, 0, null);
      const mouse: THREE.Vector2 = new THREE.Vector2();

      const originalScene: ElementRef<HTMLElement> = new ElementRef<HTMLElement>(document.createElement("HTMLElement"));
      const modifiedScene: ElementRef<HTMLElement> = new ElementRef<HTMLElement>(document.createElement("HTMLElement"));

      service.originalGame = originalScene;
      service.modifiedGame = modifiedScene;

      spyOn<any>(service["mousePositionService"], "setMousePosition");
      service["adjustMouse"](true, event, mouse);

      await expect(service["mousePositionService"].setMousePosition).toHaveBeenCalled();
    });
  });

  describe("emitEvent()", () => {
    it("Should call emitMessage function", async () => {
      const service: ObjectHandler = TestBed.get(ObjectHandler);

      spyOn<any>(service["socket"], "emitMessage");
      service["emitEvent"](undefined);

      await expect(service["socket"].emitMessage).toHaveBeenCalled();
    });
  });
});
