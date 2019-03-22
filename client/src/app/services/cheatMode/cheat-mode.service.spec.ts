
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import * as sinon from "sinon";
import { Pair } from "../../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";
import { ObjectType } from "../../../../../common/model/scene/scene";
import { thematicSceneModifications } from "../../tests/scene/ThematicSceneModificationsMock";
import { sceneModifications } from "../../tests/scene/geometricSceneModificationsMock";
import { scene } from "../../tests/scene/sceneMock";
import { thematicScene } from "../../tests/scene/thematicSceneMock";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { ModifiedSceneParserService } from "../scene/sceneParser/modified-scene-parser.service";
import { SceneParserService } from "../scene/sceneParser/scene-parser.service";
import { CheatModeService } from "./cheat-mode.service";

// tslint:disable
describe("CheatModeService", () => {

  let cheatModeService: CheatModeService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
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
      expect(cheatModeService.cheatActivated).to.be.false;
    });

    it("should change cheatActivated to true when the method toggleCheatMode is called once", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode").callsFake(
        () => {cheatModeService.cheatActivated = !cheatModeService.cheatActivated;
      });

      cheatModeService.toggleCheatMode(blankModifiedScene);
      expect(cheatModeService.cheatActivated).to.be.true;
      stub.restore();
    });

    it("should change cheatActivated to true then to false when the method toggleCheatMode is called twice", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode").callsFake(
        () => {cheatModeService.cheatActivated = !cheatModeService.cheatActivated;
      });
      
      cheatModeService.toggleCheatMode(blankModifiedScene);
      cheatModeService.toggleCheatMode(blankModifiedScene);
      expect(cheatModeService.cheatActivated).to.be.false;
      stub.restore();
    });
  });

  describe("testing toggleCheatMode method", () => {

    describe("when scene is geometric", () => {

      let modifiedScene: ICommonGeometricModifications & ICommonThematicModifications;
      beforeEach(async () => {
        modifiedScene = (sceneModifications as ICommonGeometricModifications & ICommonThematicModifications);

        cheatModeService.originalLoaderService = new SceneLoaderService();
        cheatModeService.modifiedLoaderService = new SceneLoaderService();

        cheatModeService.originalLoaderService.scene = await new SceneParserService(scene).parseScene();
        cheatModeService.modifiedLoaderService.scene = 
          await new ModifiedSceneParserService(ObjectType.Geometric).parseModifiedScene(cheatModeService.originalLoaderService.scene, modifiedScene);

      });

      it("should change the added objects visibility to false in the modified scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        const addedObjectsId: string[] = modifiedScene.addedObjects.map((object) => object.id);
        const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
        addedObjectsId.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.false;
          }
        })
      });

      it("should change the added objects visibility to true in the modified scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        cheatModeService.toggleCheatMode(modifiedScene);
        const addedObjectsId: string[] = modifiedScene.addedObjects.map((object: ICommonSceneObject) => object.id);
        const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
        addedObjectsId.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.true;
          }
        })
      });
      
      it("should change the deleted objects visibility to false in the original scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
        modifiedScene.deletedObjects.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.false;
          }
        });
      });

      it("should change the deleted objects visibility to true in the original scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        cheatModeService.toggleCheatMode(modifiedScene);
        const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
        modifiedScene.deletedObjects.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.true;
          }
        });
      });

      it("should change the color changed objects visibility to false in the original scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        const colorChangedObjectsId: string[] = modifiedScene.colorChangedObjects.map((object: Pair<string, number>) => object.key);
        const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
        colorChangedObjectsId.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.false;
          }
        });
      });

      it("should change the color changed objects visibility to true in the original scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        cheatModeService.toggleCheatMode(modifiedScene);
        const colorChangedObjectsId: string[] = modifiedScene.colorChangedObjects.map((object: Pair<string, number>) => object.key);
        const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
        colorChangedObjectsId.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);         expect(object3D).to.not.be.undefined;
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.true;
          }
        });
      });

      it("should change the color changed objects visibility to false in the modified scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        const colorChangedObjectsId: string[] = modifiedScene.colorChangedObjects.map((object: Pair<string, number>) => object.key);
        const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
        colorChangedObjectsId.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.false;
          }
        });
      });

      it("should change the color changed objects visibility to true in the modified scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        cheatModeService.toggleCheatMode(modifiedScene);
        const colorChangedObjectsId: string[] = modifiedScene.colorChangedObjects.map((object: Pair<string, number>) => object.key);
        const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
        colorChangedObjectsId.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);         expect(object3D).to.not.be.undefined;
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.true;
          }
        });
      });
    });

    describe("when scene is thematic", () => {
      let modifiedScene: ICommonGeometricModifications & ICommonThematicModifications;
      beforeEach(async () => {
        modifiedScene = (thematicSceneModifications as ICommonGeometricModifications & ICommonThematicModifications);

        cheatModeService.originalLoaderService = new SceneLoaderService();
        cheatModeService.modifiedLoaderService = new SceneLoaderService();

        cheatModeService.originalLoaderService.scene = await new SceneParserService(thematicScene).parseScene();
        cheatModeService.modifiedLoaderService.scene = 
          await new ModifiedSceneParserService(ObjectType.Thematic).parseModifiedScene(cheatModeService.originalLoaderService.scene, modifiedScene);
      });

      it("should change the added objects visibility to false in the modified scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        const addedObjectsId: string[] = modifiedScene.addedObjects.map((object) => object.id);
        const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
        addedObjectsId.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.false;
          }
        })
      });
      
      it("should change the added objects visibility to true in the modified scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        cheatModeService.toggleCheatMode(modifiedScene);
        const addedObjectsId: string[] = modifiedScene.addedObjects.map((object: ICommonSceneObject) => object.id);
        const objectThree: THREE.Object3D[] = cheatModeService.modifiedLoaderService.scene.children;
        addedObjectsId.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.true;
          }
        })
      });

      it("should change the deleted objects visibility to false in the original scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
        modifiedScene.deletedObjects.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.false;
          }
        });
      });

      it("should change the deleted objects visibility to true in the original scene", () => {
        cheatModeService.toggleCheatMode(modifiedScene);
        cheatModeService.toggleCheatMode(modifiedScene);
        const objectThree: THREE.Object3D[] = cheatModeService.originalLoaderService.scene.children;
        modifiedScene.deletedObjects.forEach((id: string) => {
          const object3D: THREE.Object3D | undefined = objectThree.find((object: THREE.Object3D) => object.userData.id === id);
          expect(object3D).to.not.be.undefined;
          if (object3D) {
            expect(object3D.visible).to.be.true;
          }
        });
      });
    });
  });
});