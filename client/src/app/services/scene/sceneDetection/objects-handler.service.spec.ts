import { TestBed } from "@angular/core/testing";

import {RouterTestingModule} from "@angular/router/testing";
import * as sinon from "sinon";
import * as THREE from "three";
import { CameraGenerator } from "../sceneRenderer/cameraGenerator";
import { IThreeObject } from "./IThreeObject";
import { ObjectDetectionService } from "./object-detection.service";
import { ObjectHandler } from "./objects-handler.service";
// import { ObjectRestorationService } from "./object-restoration.service";
// import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";

describe("ObjectHandler", () => {
  let event: MouseEvent;
  const sceneOriginal: THREE.Scene = new THREE.Scene();
  const sceneModified: THREE.Scene = new THREE.Scene();

  const containerWidth: number = 123;
  const containerHeight: number = 45;
  const cameraOriginal: THREE.PerspectiveCamera = CameraGenerator.createCamera(containerWidth, containerHeight);
  const cameraModified: THREE.PerspectiveCamera = CameraGenerator.createCamera(containerWidth, containerHeight);

  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const geometryCube: THREE.BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
  // tslint:disable-next-line: number-literal-format
  const materialCube: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube: THREE.Mesh = new THREE.Mesh( geometryCube, materialCube );
  sceneOriginal.add( cube );
  sceneModified.add( cube );

  const meshesOriginal: THREE.Object3D[] = [];
  meshesOriginal.push(cube);
  const meshesModified: THREE.Object3D[] = [];
  meshesModified.push(cube);

  event = new MouseEvent("click");
  // tslint:disable-next-line: no-magic-numbers
  event.initMouseEvent("click", true, true, window, 0, 0, 0, 640, 480, false, false, false, false, 0, null);

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterTestingModule]});
  });

  describe("clickOnScene()", () => {
    it("Should detect a cube in both scenes", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      const objectDetectionService: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const mouse: THREE.Vector2 = new THREE.Vector2(0, 0);
      const stub: sinon.SinonStub = sinon.stub(objectDetectionService, "rayCasting");
      const temp: IThreeObject = {
        original: cube,
        modified: cube,
      };
      stub.returns(temp);

      // tslint:disable-next-line: no-floating-promises
      objectHandler.clickOnScene(event, true);
      // tslint:disable-next-line: max-line-length
      objectHandler.detectedObjects = objectDetectionService.rayCasting(mouse, cameraOriginal, cameraModified, sceneOriginal, sceneModified, meshesOriginal, meshesModified);

      await expect(objectHandler.detectedObjects.original).toEqual(temp.original);
      await expect(objectHandler.detectedObjects.modified).toEqual(temp.modified);
      stub.restore();
    });
  });
});
