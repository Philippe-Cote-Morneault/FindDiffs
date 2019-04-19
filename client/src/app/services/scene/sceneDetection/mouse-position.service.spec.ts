import { TestBed } from "@angular/core/testing";

import * as THREE from "three";
import { MousePositionService } from "./mouse-position.service";

describe("MousePositionService", () => {

  beforeEach(() => TestBed.configureTestingModule({}));
  // tslint:disable:no-magic-numbers
  it("Should call the function at least once", async () => {
    const service: MousePositionService = TestBed.get(MousePositionService);

    const event: MouseEvent = document.createEvent("MouseEvent");
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 371, 207, false, false, false, false, 0, null);

    const mouse: THREE.Vector2 = new THREE.Vector2(80, 80);

    const divBoxInformation: ClientRect | DOMRect = {
        bottom: 585.1999969482422,
        height: 480,
        left: 160,
        right: 800,
        top: 105.19999694824219,
        width: 640,
        x: 160,
        y: 105.19999694824219,
      };

    const clientWidth: number = 638;
    const clientHeight: number = 478;

    service.setMousePosition(event, mouse, divBoxInformation, clientWidth, clientHeight);
    await expect(mouse.x.toFixed(2).toString()).toEqual("-0.34");
    await expect(mouse.y.toFixed(2).toString()).toEqual("0.57");
  });
});
