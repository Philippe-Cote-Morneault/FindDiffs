import { expect } from "chai";
import { sceneModifications } from "src/app/tests/scene/geometricSceneModificationsMock";
import { scene } from "src/app/tests/scene/sceneMock";
import { SceneLoaderService } from "./sceneLoader.service";

describe("SceneLoaderService", () => {
    const sceneLoaderService: SceneLoaderService = new SceneLoaderService();

    describe("loadOriginalScene()", () => {
        it("Should add an element to an HTML element", async () => {
            const dummyContainer: HTMLElement = document.createElement("div");
            await sceneLoaderService.loadOriginalScene(dummyContainer, scene);

            expect(dummyContainer.childElementCount).to.equal(1);
        });
    });

    describe("loadModifiedScene()", () => {
        it("Should add an element to an HTML element", async () => {
            const dummyContainer: HTMLElement = document.createElement("div");
            await sceneLoaderService.loadModifiedScene(dummyContainer, sceneLoaderService.scene, sceneModifications);

            expect(dummyContainer.childElementCount).to.equal(1);
        });
    });
});
