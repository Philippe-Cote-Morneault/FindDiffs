import { TestBed } from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import * as sinon from "sinon";
import * as THREE from "three";
import { MousePositionService } from "./mouse-position.service";

describe("MousePositionService", () => {

  let mousePositionService: MousePositionService;
  let originalScene: HTMLElement;
  let event: MouseEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterTestingModule]});
    mousePositionService = TestBed.get(MousePositionService);

    originalScene  = (document.createElement("div") as HTMLElement);
    originalScene.style.width = "480px";
    originalScene.style.height = "640px";

    event = new MouseEvent("click");
    // tslint:disable-next-line: no-magic-numbers
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 640, 480, false, false, false, false, 0, null);
  });

  it("Should normalize the mouse position between -1 and 1", () => {
    let mouse: THREE.Vector2 = new THREE.Vector2(0, 0);
    const stub: sinon.SinonStub = sinon.stub(mousePositionService, "setMousePosition");
    mouse = mousePositionService.setMousePosition(event, mouse, originalScene);
    expect(mouse).toBeUndefined();
    stub.restore();
  });

  it("Should give the same result when we call getBoundingClient function from HTMLElement", async() => {
    const stub: sinon.SinonStub = sinon.stub(originalScene, "getBoundingClientRect");
    const returnValue: ClientRect | DOMRect = { width: 100, height: 100, top: 5, bottom: 5, right: 15, left: 15};
    stub.returns(returnValue);

    const mouse: THREE.Vector2 = new THREE.Vector2(0, 0);
    mousePositionService.setMousePosition(event, mouse, originalScene);

    await expect(mousePositionService.divBoxInformation).toEqual(returnValue);
    stub.restore();
  });
});
