import { expect } from "chai";
import * as sinon from "sinon";
import { Pair } from "../../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";
import { ObjectType } from "../../../../../common/model/scene/scene";
import { sceneModifications } from "../../tests/scene/geometricSceneModificationsMock";
import { scene } from "../../tests/scene/sceneMock";
import { thematicScene } from "../../tests/scene/thematicSceneMock";
import { thematicSceneModifications } from "../../tests/scene/thematicSceneModificationsMock";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { ICommonSceneAndObjects } from "../scene/sceneParser/ICommonSceneAndObjects";
import { ModifiedSceneParserService } from "../scene/sceneParser/modifiedSceneParser.service";
import { SceneParserService } from "../scene/sceneParser/sceneParser.service";
import { CheatModeService } from "./cheatMode.service";

describe("CheatModeService", () => {

    let cheatModeService: CheatModeService;
    beforeEach(() => {
        cheatModeService = new CheatModeService();
    });

    describe("testing the value of cheatActivated attribute in various situations", () => {
        const blankModifiedScene: ICommonGeometricModifications & ICommonThematicModifications = {
            id: "",
            type: ObjectType.Geometric,
            addedObjects: [],
            deletedObjects: [],
            colorChangedObjects: [],
            texturesChangedObjects: [],
        };

        it("should be false on creation of the service", () => {
            expect(cheatModeService.cheatActivated).to.equal(false);
        });

        it("should change cheatActivated to true when the method toggleCheatMode is called once", () => {
            const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode").callsFake(
                () => {cheatModeService.cheatActivated = !cheatModeService.cheatActivated;
            });

            cheatModeService.toggleCheatMode(blankModifiedScene);
            expect(cheatModeService.cheatActivated).to.equal(true);
            stub.restore();
        });

        it("should change cheatActivated to true then to false when the method toggleCheatMode is called twice", () => {
            const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode").callsFake(
                () => {cheatModeService.cheatActivated = !cheatModeService.cheatActivated;
            });

            cheatModeService.toggleCheatMode(blankModifiedScene);
            cheatModeService.toggleCheatMode(blankModifiedScene);
            expect(cheatModeService.cheatActivated).to.equal(false);
            stub.restore();
        });
    });

    describe("toggleCheatMode()", () => {

        describe("when scene is geometric", () => {

            let modifiedScene: ICommonGeometricModifications & ICommonThematicModifications;
            beforeEach(async () => {
                modifiedScene = (sceneModifications as ICommonGeometricModifications & ICommonThematicModifications);

                cheatModeService.originalLoaderService = new SceneLoaderService();
                cheatModeService.modifiedLoaderService = new SceneLoaderService();

                const sceneAndObjectsOriginal: ICommonSceneAndObjects = await new SceneParserService(scene).parseScene();
                const sceneAndObjectsModified: ICommonSceneAndObjects = await new ModifiedSceneParserService(ObjectType.Geometric)
                    .parseModifiedScene(cheatModeService.originalLoaderService.scene, modifiedScene);

                cheatModeService.originalLoaderService.scene = sceneAndObjectsOriginal.scene;
                cheatModeService.modifiedLoaderService.scene = sceneAndObjectsModified.scene;
            });

            describe("enableCheats()", () => {
                describe("changeAddedObjectsColor()", () => {
                    it("should change the added objects visibility to false in the modified scene", () => {
                        cheatModeService.toggleCheatMode(modifiedScene);
                        const addedObjectsId: string[] = modifiedScene.addedObjects.map((object) => object.id);
                        const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
                        addedObjectsId.forEach((id: string) => {
                            const object3D: THREE.Object3D | undefined = objectThree.find(
                                (object: THREE.Object3D) => object.userData.id === id);
                            expect(object3D).to.not.equal(undefined);
                            if (object3D) {
                                expect(object3D.visible).to.equal(false);
                            }
                        });
                    });
                });

                describe("changeDeletedObjectsColor()", () => {
                    it("should change the deleted objects visibility to false in the original scene", () => {
                        cheatModeService.toggleCheatMode(modifiedScene);
                        const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
                        modifiedScene.deletedObjects.forEach((id: string) => {
                            const object3D: THREE.Object3D | undefined = objectThree.find(
                                (object: THREE.Object3D) => object.userData.id === id);
                            expect(object3D).to.not.equal(undefined);
                            if (object3D) {
                                expect(object3D.visible).to.equal(false);
                            }
                        });
                    });
                });

                describe("changeColorChangedObjectsColor()", () => {
                    it("should change the color changed objects visibility to false in the original scene", () => {
                        cheatModeService.toggleCheatMode(modifiedScene);
                        const colorChangedObjectsId: string[] = modifiedScene.colorChangedObjects.map(
                            (object: Pair<string, number>) => object.key);
                        const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
                        colorChangedObjectsId.forEach((id: string) => {
                            const object3D: THREE.Object3D | undefined = objectThree.find(
                                (object: THREE.Object3D) => object.userData.id === id);
                            expect(object3D).to.not.equal(undefined);
                            if (object3D) {
                                expect(object3D.visible).to.equal(false);
                            }
                        });
                    });

                    it("should change the color changed objects visibility to false in the modified scene", () => {
                        cheatModeService.toggleCheatMode(modifiedScene);
                        const colorChangedObjectsId: string[] = modifiedScene.colorChangedObjects.map(
                            (object: Pair<string, number>) => object.key);
                        const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
                        colorChangedObjectsId.forEach((id: string) => {
                            const object3D: THREE.Object3D | undefined = objectThree.find(
                                (object: THREE.Object3D) => object.userData.id === id);
                            expect(object3D).to.not.equal(undefined);
                            if (object3D) {
                                expect(object3D.visible).to.equal(false);
                            }
                        });
                    });
                });
            });

            describe("showAllObjects()", () => {
                it("should change the added objects visibility to true in the modified scene", () => {
                    cheatModeService.toggleCheatMode(modifiedScene);
                    cheatModeService.toggleCheatMode(modifiedScene);
                    const addedObjectsId: string[] = modifiedScene.addedObjects.map((object: ICommonSceneObject) => object.id);
                    const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
                    addedObjectsId.forEach((id: string) => {
                        const object3D: THREE.Object3D | undefined = objectThree.find(
                            (object: THREE.Object3D) => object.userData.id === id);
                        expect(object3D).to.not.equal(undefined);
                        if (object3D) {
                            expect(object3D.visible).to.equal(true);
                        }
                    });
                });

                it("should change the deleted objects visibility to true in the original scene", () => {
                    cheatModeService.toggleCheatMode(modifiedScene);
                    cheatModeService.toggleCheatMode(modifiedScene);
                    const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
                    modifiedScene.deletedObjects.forEach((id: string) => {
                        const object3D: THREE.Object3D | undefined = objectThree.find(
                            (object: THREE.Object3D) => object.userData.id === id);
                        expect(object3D).to.not.equal(undefined);
                        if (object3D) {
                            expect(object3D.visible).to.equal(true);
                        }
                    });
                });

                it("should change the color changed objects visibility to true in the original scene", () => {
                    cheatModeService.toggleCheatMode(modifiedScene);
                    cheatModeService.toggleCheatMode(modifiedScene);
                    const colorChangedObjectsId: string[] = modifiedScene.colorChangedObjects.map(
                        (object: Pair<string, number>) => object.key);
                    const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
                    colorChangedObjectsId.forEach((id: string) => {
                        const object3D: THREE.Object3D | undefined = objectThree.find(
                            (object: THREE.Object3D) => object.userData.id === id);
                        expect(object3D).to.not.equal(undefined);
                        expect(object3D).to.not.equal(undefined);
                        if (object3D) {
                            expect(object3D.visible).to.equal(true);
                        }
                    });
                });

                it("should change the color changed objects visibility to true in the modified scene", () => {
                    cheatModeService.toggleCheatMode(modifiedScene);
                    cheatModeService.toggleCheatMode(modifiedScene);
                    const colorChangedObjectsId: string[] = modifiedScene.colorChangedObjects.map(
                        (object: Pair<string, number>) => object.key);
                    const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
                    colorChangedObjectsId.forEach((id: string) => {
                        const object3D: THREE.Object3D | undefined = objectThree.find(
                            (object: THREE.Object3D) => object.userData.id === id);
                        expect(object3D).to.not.equal(undefined);
                        expect(object3D).to.not.equal(undefined);
                        if (object3D) {
                            expect(object3D.visible).to.equal(true);
                        }
                    });
                });
            });
        });

        describe("when scene is thematic", () => {
            let modifiedScene: ICommonGeometricModifications & ICommonThematicModifications;
            beforeEach(async () => {
                modifiedScene = (thematicSceneModifications as ICommonGeometricModifications & ICommonThematicModifications);

                cheatModeService.originalLoaderService = new SceneLoaderService();
                cheatModeService.modifiedLoaderService = new SceneLoaderService();

                const sceneAndObjectsOriginal: ICommonSceneAndObjects = await new SceneParserService(thematicScene).parseScene();
                const sceneAndObjectsModified: ICommonSceneAndObjects = await new ModifiedSceneParserService(ObjectType.Thematic)
                .parseModifiedScene(cheatModeService.originalLoaderService.scene, modifiedScene);

                cheatModeService.originalLoaderService.scene = sceneAndObjectsOriginal.scene;
                cheatModeService.modifiedLoaderService.scene = sceneAndObjectsModified.scene;
            });

            describe("enableCheats()", () => {
                describe("changeAddedObjectsColor()", () => {
                    it("should change the added objects visibility to false in the modified scene", () => {
                        cheatModeService.toggleCheatMode(modifiedScene);
                        const addedObjectsId: string[] = modifiedScene.addedObjects.map((object) => object.id);
                        const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
                        addedObjectsId.forEach((id: string) => {
                            const object3D: THREE.Object3D | undefined = objectThree.find(
                                (object: THREE.Object3D) => object.userData.id === id);
                            expect(object3D).to.not.equal(undefined);
                            if (object3D) {
                                expect(object3D.visible).to.equal(false);
                            }
                        });
                    });
                });

                describe("changeDeletedObjectsColor()", () => {
                    it("should change the deleted objects visibility to false in the original scene", () => {
                        cheatModeService.toggleCheatMode(modifiedScene);
                        const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
                        modifiedScene.deletedObjects.forEach((id: string) => {
                            const object3D: THREE.Object3D | undefined = objectThree.find(
                                (object: THREE.Object3D) => object.userData.id === id);
                            expect(object3D).to.not.equal(undefined);
                            if (object3D) {
                                expect(object3D.visible).to.equal(false);
                            }
                        });
                    });
                });

                describe("changeThematicChangedObjects()", () => {
                    it("should change the texture changed object visibility to false in the original scene", () => {
                        cheatModeService.toggleCheatMode(modifiedScene);
                        const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
                        const textureChangedObjectId: string[] = modifiedScene.texturesChangedObjects.map(
                            (pair: Pair<string, string>) => pair.key);
                        textureChangedObjectId.forEach((id: string) => {
                            const object3D: THREE.Object3D | undefined = objectThree.find(
                                (object: THREE.Object3D) => object.userData.id === id);
                            expect(object3D).to.not.equal(undefined);
                            if (object3D) {
                                expect(object3D.visible).to.equal(false);
                            }
                        });
                    });

                    it("should change the texture changed object visibility to false in the modified scene", () => {
                        cheatModeService.toggleCheatMode(modifiedScene);
                        const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
                        const textureChangedObjectId: string[] = modifiedScene.texturesChangedObjects.map(
                            (pair: Pair<string, string>) => pair.key);
                        textureChangedObjectId.forEach((id: string) => {
                            const object3D: THREE.Object3D | undefined = objectThree.find(
                                (object: THREE.Object3D) => object.userData.id === id);
                            expect(object3D).to.not.equal(undefined);
                            if (object3D) {
                                expect(object3D.visible).to.equal(false);
                            }
                        });
                    });
                });
            });

            describe("showAllObjects()", () => {
                it("should change the added objects visibility to true in the modified scene", () => {
                    cheatModeService.toggleCheatMode(modifiedScene);
                    cheatModeService.toggleCheatMode(modifiedScene);
                    const addedObjectsId: string[] = modifiedScene.addedObjects.map((object: ICommonSceneObject) => object.id);
                    const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
                    addedObjectsId.forEach((id: string) => {
                        const object3D: THREE.Object3D | undefined = objectThree.find(
                            (object: THREE.Object3D) => object.userData.id === id);
                        expect(object3D).to.not.equal(undefined);
                        if (object3D) {
                            expect(object3D.visible).to.equal(true);
                        }
                    });
                });

                it("should change the deleted objects visibility to true in the original scene", () => {
                    cheatModeService.toggleCheatMode(modifiedScene);
                    cheatModeService.toggleCheatMode(modifiedScene);
                    const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
                    modifiedScene.deletedObjects.forEach((id: string) => {
                        const object3D: THREE.Object3D | undefined = objectThree.find(
                            (object: THREE.Object3D) => object.userData.id === id);
                        expect(object3D).to.not.equal(undefined);
                        if (object3D) {
                            expect(object3D.visible).to.equal(true);
                        }
                    });
                });

                it("should change the texture changed object visibility to true in the original scene", () => {
                    cheatModeService.toggleCheatMode(modifiedScene);
                    cheatModeService.toggleCheatMode(modifiedScene);
                    const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
                    const textureChangedObjectId: string[] = modifiedScene.texturesChangedObjects.map(
                        (pair: Pair<string, string>) => pair.key);
                    textureChangedObjectId.forEach((id: string) => {
                        const object3D: THREE.Object3D | undefined = objectThree.find(
                            (object: THREE.Object3D) => object.userData.id === id);
                        expect(object3D).to.not.equal(undefined);
                        if (object3D) {
                            expect(object3D.visible).to.equal(true);
                        }
                    });
                });

                it("should change the texture changed object visibility to true in the modified scene", () => {
                    cheatModeService.toggleCheatMode(modifiedScene);
                    cheatModeService.toggleCheatMode(modifiedScene);
                    const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
                    const textureChangedObjectId: string[] = modifiedScene.texturesChangedObjects.map(
                        (pair: Pair<string, string>) => pair.key);
                    textureChangedObjectId.forEach((id: string) => {
                        const object3D: THREE.Object3D | undefined = objectThree.find(
                            (object: THREE.Object3D) => object.userData.id === id);
                        expect(object3D).to.not.equal(undefined);
                        if (object3D) {
                            expect(object3D.visible).to.equal(true);
                        }
                    });
                });
            });
        });
    });

    describe("arrayNotEmpty()", () => {
        it("should return false if the array is empty", () => {
            const emptyArray: number[] = [];
            expect(cheatModeService.arrayNotEmpty(emptyArray.length)).to.equal(false);
        });

        it("should return true if the array is not empty", () => {
            const array: number[] = [1];
            expect(cheatModeService.arrayNotEmpty(array.length)).to.equal(true);
        });
    });
// tslint:disable-next-line: max-file-line-count
});
