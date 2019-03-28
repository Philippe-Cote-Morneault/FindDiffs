import { expect } from "chai";
import * as sinon from "sinon";
import * as THREE from "three";
import { ControlsGenerator } from "./controlsGenerator";

// tslint:disable: no-magic-numbers
// tslint:disable: no-empty
describe("ControlsGenerator", () => {
    let mockCamera: THREE.PerspectiveCamera;
    let mockCanvas: HTMLCanvasElement;
    beforeEach(() => {
        mockCamera = new THREE.PerspectiveCamera(45, (4 / 3), 0.1, 1000);
        mockCanvas = (document.createElement("canvas") as HTMLCanvasElement);
    });
    describe("generateGameControls", () => {
        it("should add an event listener to the document", () => {
            const stub: sinon.SinonStub = sinon.stub(document, "addEventListener").callsFake(() => {});
            ControlsGenerator.generateGameControls(mockCamera, mockCanvas);
            sinon.assert.calledOnce(stub);
            stub.restore();
        });

        it("should should move the camera by 1 unit in the -z direction", () => {
            const newPosition: THREE.Vector3 = new THREE.Vector3(0, 0, mockCamera.position.z - 1);
            const mockEvent: KeyboardEvent = new KeyboardEvent("keydown", {key: "w"});
            ControlsGenerator.generateGameControls(mockCamera, mockCanvas);
            document.dispatchEvent(mockEvent);
            expect(mockCamera.position.z).to.equal(newPosition.z);
        });
    });
});
