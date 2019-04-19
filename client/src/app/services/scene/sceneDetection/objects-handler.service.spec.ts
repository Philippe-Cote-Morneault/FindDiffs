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
});
