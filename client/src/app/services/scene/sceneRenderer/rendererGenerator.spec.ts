import { expect } from "chai";
import * as THREE from "three";
import { RendererGenerator } from "./rendererGenerator";

describe("RendererGenerator", () => {
    const width: number = 123;
    const height: number = 45;
    const renderer: THREE.WebGLRenderer = RendererGenerator.generateRenderer(width, height);

    it("Should create a renderer with the right size.", () => {
        expect(renderer.getSize().width).to.equal(width);
        expect(renderer.getSize().height).to.equal(height);
    });
});
