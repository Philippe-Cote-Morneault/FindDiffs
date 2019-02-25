import { expect } from "chai";
import { CameraGenerator } from "./cameraGenerator";

describe("CameraGenerator", () => {

    const containerWidth: number = 123;
    const containerHeight: number = 45;
    const camera: THREE.PerspectiveCamera = CameraGenerator.createCamera(containerWidth, containerHeight);

    it("Should create a camera with the right position.", () => {
        expect(camera.position.x).to.equal(50);
        expect(camera.position.y).to.equal(10);
        expect(camera.position.z).to.equal(50);
    });

    it("Should create a camera with a far clip of 1000.", () => {
        expect(camera.far).to.equal(1000);
    });

    it("Should create a camera with a near clip of 0.1.", () => {
        expect(camera.near).to.equal(0.1);
    });

    it("Should create a camera with an FOV of 90.", () => {
        expect(camera.fov).to.equal(90);
    });

    it("Should create a camera with a near clip of 0.1.", () => {
        expect(camera.aspect).to.equal(containerWidth/containerHeight);
    });
});