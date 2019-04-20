// import { expect } from "chai";
// import * as sinon from "sinon";
import * as THREE from "three";
import { SceneSyncerService } from "./sceneSyncer.service";

// tslint:disable: no-magic-numbers
// tslint:disable: no-empty
describe("SceneSyncerService", () => {
    // tslint:disable-next-line:prefer-const
    const sceneSyncerService: SceneSyncerService = new SceneSyncerService();
    let mockCamera1: THREE.PerspectiveCamera;
    let mockCamera2: THREE.PerspectiveCamera;
    let mockCanvas1: HTMLCanvasElement;
    let mockCanvas2: HTMLCanvasElement;
    beforeEach(() => {
        mockCamera1 = new THREE.PerspectiveCamera();
        mockCamera2 = new THREE.PerspectiveCamera();
        mockCanvas1 = document.createElement("canvas");
        mockCanvas2 = document.createElement("canvas");
        sceneSyncerService.syncScenesMovement(mockCamera1, mockCanvas1, mockCamera2, mockCanvas2);
        sceneSyncerService.isLocked = false;
    });
    describe("generateGameControls", () => {
        it("should not change the camera direction if we dont move it", () => {
            const mockEventCM: MouseEvent = new MouseEvent("contextmenu");
            const mockEventMD: MouseEvent = new MouseEvent("mousedown", {button: 2});
            const mockEventMU: MouseEvent = new MouseEvent("mouseup", {button: 2});
            const initialCameraRotation: THREE.Euler = mockCamera1.rotation;
            mockCanvas1.dispatchEvent(mockEventCM);
            mockCanvas1.dispatchEvent(mockEventMD);
            mockCanvas1.dispatchEvent(mockEventMU);
            expect(mockCamera1.rotation).toEqual(initialCameraRotation);
        });

        it("should change the camera direction if we move it", () => {
            const mockEventCM: MouseEvent = new MouseEvent("contextmenu");
            const mockEventMD: MouseEvent = new MouseEvent("mousedown", {screenX: 100, screenY: 100, button: 2});
            const mockEventMM: MouseEvent = new MouseEvent("mousemove", {screenX: 100, screenY: 100});
            const mockEventMM2: MouseEvent = new MouseEvent("mousemove", {screenX: 200, screenY: 100});
            const mockEventMU: MouseEvent = new MouseEvent("mouseup", {screenX: 200, screenY: 100, button: 2});
            const initialCameraRotation: THREE.Euler = mockCamera1.rotation;

            mockCanvas1.dispatchEvent(mockEventCM);
            mockCanvas1.dispatchEvent(mockEventMD);
            mockCanvas1.dispatchEvent(mockEventMM);
            mockCanvas1.dispatchEvent(mockEventMM2);
            mockCanvas1.dispatchEvent(mockEventMU);
            expect(mockCamera2.rotation).not.toEqual(initialCameraRotation);
        });
    });
});
