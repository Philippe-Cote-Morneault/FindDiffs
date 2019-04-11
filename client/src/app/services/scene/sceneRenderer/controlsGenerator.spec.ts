import { expect } from "chai";
import * as sinon from "sinon";
import * as THREE from "three";
import { ControlsGenerator } from "./controlsGenerator";

// tslint:disable: no-magic-numbers
// tslint:disable: no-empty
describe("ControlsGenerator", () => {
    let mockCamera: THREE.PerspectiveCamera;
    const mockScene: THREE.Scene = new THREE.Scene;
    beforeEach(() => {
        mockCamera = new THREE.PerspectiveCamera(45, (4 / 3), 0.1, 1000);
        ControlsGenerator.isLocked = false;
    });
    describe("generateGameControls", () => {
        it("should add an event listener to the document", () => {
            const stub: sinon.SinonStub = sinon.stub(document, "addEventListener").callsFake(() => {});
            ControlsGenerator.generateGameControls(mockCamera, mockScene);
            sinon.assert.calledOnce(stub);
            stub.restore();
        });

        it("should do nothing if nothing is pressed", () => {
            const newPosition: THREE.Vector3 = mockCamera.position;
            const mockEvent: KeyboardEvent = new KeyboardEvent("keydown", {key: ""});
            ControlsGenerator.generateGameControls(mockCamera, mockScene);
            document.dispatchEvent(mockEvent);
            expect(mockCamera.position).to.equal(newPosition);
        });

        it("should move the camera by 1 unit in the -z direction when w is pressed", () => {
            const newPosition: THREE.Vector3 = new THREE.Vector3(0, 0, mockCamera.position.z - 1);
            const mockEvent: KeyboardEvent = new KeyboardEvent("keydown", {key: "w"});
            ControlsGenerator.generateGameControls(mockCamera, mockScene);
            document.dispatchEvent(mockEvent);
            expect(mockCamera.position.z).to.equal(newPosition.z);
        });

        it("should move the camera by 1 unit in the z direction when s is pressed", () => {
            const newPosition: THREE.Vector3 = new THREE.Vector3(0, 0, mockCamera.position.z + 1);
            const mockEvent: KeyboardEvent = new KeyboardEvent("keydown", {key: "s"});
            ControlsGenerator.generateGameControls(mockCamera, mockScene);
            document.dispatchEvent(mockEvent);
            expect(mockCamera.position.z).to.equal(newPosition.z);
        });

        it("should move the camera by 1 unit in the -x direction when a is pressed", () => {
            const newPosition: THREE.Vector3 = new THREE.Vector3(mockCamera.position.x - 1, 0, 0);
            const mockEvent: KeyboardEvent = new KeyboardEvent("keydown", {key: "a"});
            ControlsGenerator.generateGameControls(mockCamera, mockScene);
            document.dispatchEvent(mockEvent);
            expect(mockCamera.position.x).to.equal(newPosition.x);
        });

        it("should move the camera by 1 unit in the x direction when d is pressed", () => {
            const newPosition: THREE.Vector3 = new THREE.Vector3(mockCamera.position.x + 1, 0, 0);
            const mockEvent: KeyboardEvent = new KeyboardEvent("keydown", {key: "d"});
            ControlsGenerator.generateGameControls(mockCamera, mockScene);
            document.dispatchEvent(mockEvent);
            expect(mockCamera.position.x).to.equal(newPosition.x);
        });
    });
});
