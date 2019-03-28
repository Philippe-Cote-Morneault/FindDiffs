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
        it("Should add an event listener to the document", () => {
            const stub: sinon.SinonStub = sinon.stub(document, "addEventListener").callsFake(() => {});
            ControlsGenerator.generateGameControls(mockCamera, mockCanvas);
            sinon.assert.calledOnce(stub);
            stub.restore();
        });
    });
});
