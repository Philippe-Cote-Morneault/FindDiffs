import { ElementRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import * as THREE from "three";
import { Event, ICommonSocketMessage } from "../../../../../../common/communication/webSocket/socketMessage";
import { DifferenceType, ICommonReveal3D } from "../../../../../../common/model/reveal";
import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";
import { IThreeScene } from "./IThreeObject";
import { ObjectRestorationService } from "./object-restoration.service";

describe("ObjectRestorationService", () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
  });

  // tslint:disable: no-any

  describe("isANewDifference()", () => {
    it("should return true", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);
      const differencesId: string[] = ["1", "2", "3", "4", "5"];

      service.differenceFound = differencesId;
      const returnValue: boolean = service["isANewDifference"]("7");

      await expect(returnValue).toEqual(true);
    });

    it("should return false", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);
      const differencesId: string[] = ["1", "2", "3", "4", "5"];

      service.differenceFound = differencesId;
      const returnValue: boolean = service["isANewDifference"]("4");

      await expect(returnValue).toEqual(false);
    });
  });

  describe("addDifference()", () => {
    it("Should add the difference", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);
      const differenceFound: string[] = ["1"];
      const differenceId: string = "4";

      service.differenceFound = differenceFound;
      service["addDifference"](differenceId);

      await expect(service.differenceFound.length).toBeGreaterThan(1);
    });
  });

  describe("changeTextureObject()", () => {
    it("Should show an error message", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      spyOn<any>(service, "isANewDifference").and.returnValue(false);
      spyOn<any>(service["socket"], "emitMessage");

      await service.changeTextureObject("12312312", commonScenes);
      await expect(service["socket"].emitMessage).toHaveBeenCalled();
    });

    it("Should change the texture of the object", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      spyOn<any>(service, "isANewDifference").and.returnValue(true);
      spyOn<any>(service, "addDifference");

      await service.changeTextureObject("12312312", commonScenes);
      await expect(service.addDifference).toHaveBeenCalled();
    });
  });

  describe("findOriginalObject()", () => {
    it("Should find the original object from the scene", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      // tslint:disable: no-non-null-assertion
      service["originalSceneLoader"].scene = commonScenes.original!;
      const returnValue: THREE.Object3D = service["findOriginalObject"](commonScenes.modified!, cube.uuid);

      await expect(returnValue.uuid).toEqual(cube.uuid);
    });

    it("Should find the original object from the scene", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;

      const commonScenes: IThreeScene = {
        original: scene, 
        modified: scene,
      };

      // tslint:disable: no-non-null-assertion
      service["originalSceneLoader"].scene = commonScenes.original!;
      const returnValue: THREE.Object3D = service["findOriginalObject"](commonScenes.modified!, "6546546");

      await expect(returnValue.uuid).not.toEqual(cube.uuid);
    });
  });

  describe("getOriginalSceneObject()", () => {
    it("Should return the original 3D object", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      const obj3D: THREE.Object3D | undefined = service["getOriginalSceneObject"]("12312312", commonScenes);
      await expect(obj3D).not.toBeUndefined();
    });

    it("Should return undefined", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: undefined,
        modified: scene,
      };

      const obj3D: THREE.Object3D | undefined = service["getOriginalSceneObject"]("12312312", commonScenes);
      await expect(obj3D).toBeUndefined();
    });

    // tslint:disable-next-line: max-func-body-length
    it("Should find the object in the scene", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      let originalSceneObject: THREE.Object3D = new THREE.Object3D;
      let objWasFound: boolean = false;
      spyOn<any>(service, "getOriginalSceneObject").and.callFake(() => {
        // tslint:disable-next-line: no-non-null-assertion
        commonScenes.original!.children.forEach((sceneObject) => {
          if (sceneObject.userData.id === cube) {
              objWasFound = true;
              originalSceneObject = sceneObject;
          }
        });

        return originalSceneObject;
      });

      const obj3D: THREE.Object3D | undefined = service["getOriginalSceneObject"]("12312312", commonScenes);
      await expect(objWasFound).toEqual(false);
      await expect(obj3D).not.toBeUndefined();
    });

    // tslint:disable-next-line: max-func-body-length
    it("Should find the object in the scene", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      let originalSceneObject: THREE.Object3D = new THREE.Object3D;
      let objWasFound: boolean = false;
      const uuid: string = cube.uuid;
      spyOn<any>(service, "getOriginalSceneObject").and.callFake(() => {
        // tslint:disable-next-line: no-non-null-assertion
        commonScenes.original!.children.forEach((sceneObject) => {
          if (sceneObject.uuid === uuid) {
              objWasFound = true;
              originalSceneObject = sceneObject;
          }
        });

        return originalSceneObject;
      });

      const obj3D: THREE.Object3D | undefined = service["getOriginalSceneObject"](uuid, commonScenes);
      await expect(objWasFound).toEqual(true);
      await expect(obj3D).not.toBeUndefined();
    });
  });

  describe("applyColorChange()", () => {
    it("Should change the color of the object", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      const originalSceneObject: THREE.Object3D | undefined = service["getOriginalSceneObject"](cube.uuid, commonScenes);
      service["applyColorChange"](commonScenes.modified!, originalSceneObject, cube.uuid);

      // tslint:disable-next-line: max-line-length
      await expect((commonScenes.modified!.children[0] as any ).material.color).toEqual((commonScenes.original!.children[0] as any).material.color);
    });

    it("Should change the color of the object", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      const originalSceneObject: THREE.Object3D | undefined = service["getOriginalSceneObject"](cube.uuid, commonScenes);
      service["applyColorChange"](commonScenes.modified!, originalSceneObject, "5654654");

      // tslint:disable-next-line: max-line-length
      await expect((commonScenes.modified!.children[0] as any ).material.color).toEqual((commonScenes.original!.children[0] as any).material.color);
    });
  });

  describe("changeColorObject()", () => {
    it("Should add a difference", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      spyOn<any>(service, "isANewDifference").and.returnValue(true);
      spyOn<any>(service, "addDifference");

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      service.changeColorObject("123465789", commonScenes);

      await expect(service.addDifference).toHaveBeenCalled();
    });

    it("Should not add a difference", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      spyOn<any>(service, "isANewDifference").and.returnValue(false);
      spyOn<any>(service, "addDifference");

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      service.changeColorObject("123465789", commonScenes);

      await expect(service.addDifference).not.toHaveBeenCalled();
    });
  });

  describe("applyRemoval", () => {
    it("Should not remove the 3D object", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      // tslint:disable: no-non-null-assertion
      service["modifiedSceneLoader"].scene = commonScenes.modified!;
      const numberObjects: number = service["modifiedSceneLoader"].scene.children.length;
      service["applyRemoval"](commonScenes.modified!, "132134654");

      await expect(service["modifiedSceneLoader"].scene.children.length).toEqual(numberObjects);
    });

    it("Should remove the 3D object", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      // tslint:disable: no-non-null-assertion
      service["modifiedSceneLoader"].scene = commonScenes.modified!;
      const numberObjects: number = service["modifiedSceneLoader"].scene.children.length;
      service["applyRemoval"](commonScenes.modified!, cube.userData.id);

      await expect(service["modifiedSceneLoader"].scene.children.length).not.toEqual(numberObjects);
    });
  });

  describe("removeObject()", () => {
    it("Should add a difference", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      spyOn<any>(service, "isANewDifference").and.returnValue(true);
      spyOn<any>(service, "addDifference");

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      service.removeObject("123465789", commonScenes);

      await expect(service.addDifference).toHaveBeenCalled();
    });

    it("Should not add a difference", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      spyOn<any>(service, "isANewDifference").and.returnValue(false);
      spyOn<any>(service, "addDifference");

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      service.removeObject("123465789", commonScenes);

      await expect(service.addDifference).not.toHaveBeenCalled();
    });
  });

  describe("applyAdd()", () => {
    it("Should add the object in the scene", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      service["modifiedSceneLoader"].scene = commonScenes.modified!;
      const numberObjects: number = service["modifiedSceneLoader"].scene.children.length;
      service["applyAdd"](commonScenes.original!, commonScenes.modified!, cube.uuid);
      await expect(service["modifiedSceneLoader"].scene.children.length).toBeGreaterThan(numberObjects);
    });

    it("Should not add the object in the scene", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      service["modifiedSceneLoader"].scene = commonScenes.modified!;
      const numberObjects: number = service["modifiedSceneLoader"].scene.children.length;
      service["applyAdd"](commonScenes.original!, commonScenes.modified!, "985456");
      await expect(service["modifiedSceneLoader"].scene.children.length).not.toBeGreaterThan(numberObjects);
    });
  });

  describe("addObject()", () => {
    it("Should add the difference in the array", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      spyOn<any>(service, "isANewDifference").and.returnValue(true);
      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      spyOn<any>(service, "addDifference");
      service["addObject"](cube.uuid, commonScenes, true);
      await expect(service["addDifference"]).toHaveBeenCalled();
    });

    it("Should not add the difference in the array", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      spyOn<any>(service, "isANewDifference").and.returnValue(false);
      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;

      const commonScenes: IThreeScene = {
        original: scene,
        modified: scene,
      };

      spyOn<any>(service, "addDifference");
      service["addObject"](cube.uuid, commonScenes, false);
      await expect(service["addDifference"]).not.toHaveBeenCalled();
    });

    it("Should not add the difference in the array", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      spyOn<any>(service, "isANewDifference").and.returnValue(true);
      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;

      const commonScenes: IThreeScene = {
        original: undefined,
        modified: undefined,
      };

      spyOn<any>(service, "addDifference");
      service["addObject"](cube.uuid, commonScenes, true);
      await expect(service["addDifference"]).not.toHaveBeenCalled();
    });
  });

  describe("restoreObject()", () => {
    it("Should call addObject()", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;
      spyOn<any>(service, "addObject");

      const response: ICommonReveal3D = {
        hit: true,
        differenceType: DifferenceType.removedObject,
        difference_id: cube.uuid,
      };

      await service.restoreObject(response);
      await expect(service.addObject).toHaveBeenCalled();
    });

    it("Should call changeColorObject()", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;
      spyOn<any>(service, "changeColorObject");

      const response: ICommonReveal3D = {
        hit: true,
        differenceType: DifferenceType.colorChanged,
        difference_id: cube.uuid,
      };

      await service.restoreObject(response);
      await expect(service.changeColorObject).toHaveBeenCalled();
    });

    it("Should call changeTextureObject()", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;
      spyOn<any>(service, "changeTextureObject");

      const response: ICommonReveal3D = {
        hit: true,
        differenceType: DifferenceType.textureObjectChanged,
        difference_id: cube.uuid,
      };

      await service.restoreObject(response);
      await expect(service.changeTextureObject).toHaveBeenCalled();
    });

    it("Should call removeObject()", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;
      spyOn<any>(service, "removeObject");

      const response: ICommonReveal3D = {
        hit: true,
        differenceType: DifferenceType.addedObject,
        difference_id: cube.uuid,
      };

      await service.restoreObject(response);
      await expect(service.removeObject).toHaveBeenCalled();
    });

    it("Should not call any of all modifications functions", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.userData.id = cube.uuid;
      spyOn<any>(service, "addObject");
      spyOn<any>(service, "changeColorObject");
      spyOn<any>(service, "changeTextureObject");
      spyOn<any>(service, "removeObject");

      const response: ICommonReveal3D = {
        hit: true,
        differenceType: DifferenceType.none,
        difference_id: cube.uuid,
      };

      await service.restoreObject(response);
      await expect(service.addObject).not.toHaveBeenCalled();
      await expect(service.changeColorObject).not.toHaveBeenCalled();
      await expect(service.changeTextureObject).not.toHaveBeenCalled();
      await expect(service.removeObject).not.toHaveBeenCalled();

    });
  });

  describe("notify()", () => {
    it("Should call notify function", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      spyOn<any>(service, "restoreObject");
      const message: ICommonSocketMessage = {
        data: "asdasdddd",
        timestamp: new Date(),
      };
      await service.notify(Event.GameClick, message);
      await expect(service.restoreObject).toHaveBeenCalled();
    });
  });

  describe("ngOnDestroy", () => {
    it("Should call unsubscribe function", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      spyOn<any>(service["socketService"], "unsubscribe");
      service.ngOnDestroy();
      await expect(service["socketService"].unsubscribe).toHaveBeenCalled();
    });
  });

  describe("set", () => {
    it("Should set original and modified scene loaders", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const originalSceneLoader: SceneLoaderService = new SceneLoaderService();
      const modifiedSceneLoader: SceneLoaderService = new SceneLoaderService();

      service.set(originalSceneLoader, modifiedSceneLoader);
      await expect(service["originalSceneLoader"]).toEqual(originalSceneLoader);
      await expect(service["modifiedSceneLoader"]).toEqual(modifiedSceneLoader);
    });
  });

  describe("setContainers", () => {
    it("Should set original and modified scene loaders", async () => {
      const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);

      const originalScene: ElementRef<HTMLElement> = new ElementRef<HTMLElement>(document.createElement("HTMLElement"));
      const modifiedScene: ElementRef<HTMLElement> = new ElementRef<HTMLElement>(document.createElement("HTMLElement"));

      service.setContainers(originalScene, modifiedScene);
      await expect(service.originalScene).toEqual(originalScene);
      await expect(service.modifiedScene).toEqual(modifiedScene);
    });
  });
// tslint:disable-next-line: max-file-line-count
});
