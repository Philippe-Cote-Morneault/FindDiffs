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
});
