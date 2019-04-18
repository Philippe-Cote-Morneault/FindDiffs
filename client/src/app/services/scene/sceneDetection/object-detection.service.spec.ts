import { TestBed } from "@angular/core/testing";

import * as THREE from "three";
import { CameraGenerator } from "../sceneRenderer/cameraGenerator";
import { MousePositionService } from "./mouse-position.service";
import { ObjectDetectionService } from "./object-detection.service";

// tslint:disable
describe("ObjectDetectionService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe("setCamera()", () => {
    it("Should call setCamera function", async () => {
      const service: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const mouseService: MousePositionService = new MousePositionService();
  
      let mouse: THREE.Vector2 = new THREE.Vector2();
      const event: MouseEvent = document.createEvent("MouseEvent");
      event.initMouseEvent("click", true, true, window, 0, 0, 0, 371, 207, false, false, false, false, 0, null);
      const divBoxInformation: ClientRect | DOMRect = {
          bottom: 585.1999969482422,
          height: 480,
          left: 160,
          right: 800,
          top: 105.19999694824219,
          width: 640,
          x: 160,
          y: 105.19999694824219,
        };
  
      const clientWidth: number = 638;
      const clientHeight: number = 478;
  
      mouseService.setMousePosition(event, mouse, divBoxInformation, clientWidth, clientHeight);
  
  
      let raycaster: THREE.Raycaster = new THREE.Raycaster();
      let hasSetRaycaster: boolean = false;
      const camera: THREE.PerspectiveCamera = CameraGenerator.createCamera(window.screenX, window.screenY);
      spyOn<any>(service, "setCamera").and.callFake(() => {
        raycaster.setFromCamera(mouse, camera);
        hasSetRaycaster = true;
      });
  
      service["setCamera"](mouse, camera, camera);
  
      await expect(hasSetRaycaster).toEqual(true);
    });
  
    it("Should set the camera to the raycaster", async () => {
      const service: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const mouseService: MousePositionService = new MousePositionService();
  
      let mouse: THREE.Vector2 = new THREE.Vector2();
      const event: MouseEvent = document.createEvent("MouseEvent");
      event.initMouseEvent("click", true, true, window, 0, 0, 0, 371, 207, false, false, false, false, 0, null);
      const divBoxInformation: ClientRect | DOMRect = {
          bottom: 585.1999969482422,
          height: 480,
          left: 160,
          right: 800,
          top: 105.19999694824219,
          width: 640,
          x: 160,
          y: 105.19999694824219,
        };
  
      const clientWidth: number = 638;
      const clientHeight: number = 478;
  
      mouseService.setMousePosition(event, mouse, divBoxInformation, clientWidth, clientHeight);
  
  
      let raycaster: THREE.Raycaster = new THREE.Raycaster();
      let hasSetRaycaster: boolean = false;
      const camera: THREE.PerspectiveCamera = CameraGenerator.createCamera(window.screenX, window.screenY);
      spyOn<any>(raycaster, "setFromCamera").and.callFake(() => {
        hasSetRaycaster = true;
      });
  
      service["setCamera"](mouse, camera, camera);
      raycaster.setFromCamera(mouse, camera);
  
      await expect(hasSetRaycaster).toEqual(true);
    });
  });

  describe("getParent()", () => {
    it("Should return the parent of the object3D", async () => {
      const service: ObjectDetectionService = TestBed.get(ObjectDetectionService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const obj3D: THREE.Object3D = service["getParent"](cube, scene);

      if (obj3D.parent) {
        const parent: any = obj3D.parent;
        console.log(parent);
        await expect(parent.type).toEqual("Scene");
      }
    });

    it("Should call the function getParent", async () => {
      const service: ObjectDetectionService = TestBed.get(ObjectDetectionService);

      const scene: THREE.Scene = new THREE.Scene();

      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var cube: THREE.Mesh = new THREE.Mesh( geometry, material );
      scene.add( cube );

      let counter: number = 0;
      let obj3D: THREE.Object3D;
      spyOn<any>(service, "getParent").and.callFake(() => {
        if (counter === 1) {
          return obj3D;
        } else {
          ++counter;
          if (cube.parent !== scene as THREE.Object3D) {
              obj3D = cube.parent as THREE.Object3D;
              obj3D = service["getParent"](obj3D, scene);
          }
          return obj3D; 
        }
      });

      service["getParent"](cube, scene);

      expect(counter).toBeGreaterThanOrEqual(1);
    });
  });


  describe("getParent()", () => {
    it("Should", async () => {

    });
  });

});
