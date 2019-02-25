import { expect } from "chai";
// tslint:disable-next-line:ordered-imports
import * as THREE from "three";
import { CameraGenerator } from "./cameraGenerator";
import { ControlsGenerator } from "./controlsGenerator";

describe("ControlsGenerator", () => {
    describe("generateGameCardControls()", () => {
        const controls: THREE.OrbitControls = ControlsGenerator.generateGameCardControls(
            // tslint:disable-next-line:no-magic-numbers
            CameraGenerator.createCamera(123, 45),
            document.createElement("canvas"),
        );

        it("Should create controls with disabled keys.", () => {
            expect(controls.enableKeys).to.equal(false);
        });

        it("Should create controls with autoRotate enabled.", () => {
            expect(controls.autoRotate).to.equal(true);
        });

        it("Should create controls with disabled keys.", () => {
            expect(controls.target.x).to.equal(0);
            // tslint:disable-next-line:no-magic-numbers
            expect(controls.target.y).to.equal(10);
            expect(controls.target.z).to.equal(0);
        });
    });

    describe("generateGameControls()", () => {
        const controls: THREE.OrbitControls = ControlsGenerator.generateGameControls(
            // tslint:disable-next-line:no-magic-numbers
            CameraGenerator.createCamera(123, 45),
            document.createElement("canvas"),
        );

        it("Should create controls with enabled keys.", () => {
            expect(controls.enableKeys).to.equal(true);
        });

        it("Should create controls with autoRotate disabled.", () => {
            expect(controls.autoRotate).to.equal(false);
        });

        it("Should create controls with disabled keys.", () => {
            expect(controls.target.x).to.equal(0);
            // tslint:disable-next-line:no-magic-numbers
            expect(controls.target.y).to.equal(10);
            expect(controls.target.z).to.equal(0);
        });
    });
});