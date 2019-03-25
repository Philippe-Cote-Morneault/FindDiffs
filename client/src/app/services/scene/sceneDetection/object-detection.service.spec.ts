import { TestBed } from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import * as THREE from "three";
import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";
import { CameraGenerator } from "../sceneRenderer/cameraGenerator";
import { ObjectDetectionService } from "./object-detection.service";

describe("ObjectDetectionService", () => {
  let event: MouseEvent;
  let sceneOriginal: THREE.Scene;
  let sceneModified: THREE.Scene;

  const containerWidth: number = 123;
  const containerHeight: number = 45;
  let cameraOriginal: THREE.PerspectiveCamera = CameraGenerator.createCamera(containerWidth, containerHeight);
  let cameraModified: THREE.PerspectiveCamera = CameraGenerator.createCamera(containerWidth, containerHeight);

  let renderer: THREE.WebGLRenderer;

  let geometryCube: THREE.BoxGeometry;
  let materialCube: THREE.MeshBasicMaterial;
  let cube: THREE.Mesh;

  let meshesOriginal: THREE.Object3D[];
  let meshesModified: THREE.Object3D[];

  let originalSceneLoader: SceneLoaderService;
  let modifiedSceneLoader: SceneLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterTestingModule]});
    sceneOriginal = new THREE.Scene();
    sceneModified = new THREE.Scene();
    cameraOriginal = CameraGenerator.createCamera(containerWidth, containerHeight);
    cameraModified = CameraGenerator.createCamera(containerWidth, containerHeight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    geometryCube = new THREE.BoxGeometry( 1, 1, 1 );

    // tslint:disable-next-line: number-literal-format
    materialCube = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cube = new THREE.Mesh( geometryCube, materialCube );

    sceneOriginal.add( cube );
    sceneModified.add( cube );

    meshesOriginal = [];
    meshesOriginal.push(cube);
    meshesModified = [];
    meshesModified.push(cube);

    originalSceneLoader = new SceneLoaderService;
    modifiedSceneLoader = new SceneLoaderService;
    event = new MouseEvent("click");
    // tslint:disable-next-line: no-magic-numbers
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 640, 480, false, false, false, false, 0, null);
  });

  describe("rayCasting()", () => {
    it("Should detect objects from the original and modified scene", () => {
      const service: ObjectDetectionService = TestBed.get(ObjectDetectionService);

      // tslint:disable-next-line: no-magic-numbers
      const mouse: THREE.Vector2 = new THREE.Vector2(0.2, -0.4);
      const 

      expect(service).toBeTruthy();
    });
  });
});
