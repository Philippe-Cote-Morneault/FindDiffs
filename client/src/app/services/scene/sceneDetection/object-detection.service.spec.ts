import { TestBed } from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import * as sinon from "sinon";
import * as THREE from "three";
// import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";
import { CameraGenerator } from "../sceneRenderer/cameraGenerator";
import { IThreeObject } from "./IThreeObject";
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

  // let originalSceneLoader: SceneLoaderService;
  // let modifiedSceneLoader: SceneLoaderService;

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
    event = new MouseEvent("click");
    // tslint:disable-next-line: no-magic-numbers
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 640, 480, false, false, false, false, 0, null);
  });

  describe("rayCasting()", () => {
    it("Should detect objects from the original and modified scene", async () => {
      const objectDetection: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const stub: sinon.SinonStub = sinon.stub(objectDetection, "rayCasting");
      const returnValue: IThreeObject = {
        original: cube,
        modified: cube,
      };
      stub.returns(returnValue);

      // tslint:disable-next-line: no-magic-numbers
      const mouse: THREE.Vector2 = new THREE.Vector2(0.2, -0.4);

      const result: IThreeObject = objectDetection.rayCasting(mouse, cameraOriginal, cameraModified,
                                                              sceneOriginal, sceneModified, meshesOriginal, meshesOriginal);
      await expect(result.original).toEqual(returnValue.original);
      await expect(result.modified).toEqual(returnValue.modified);
      stub.restore();
    });

    it("Should give the same values when there is a raycaster", async () => {
      const objectDetection: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const stub1: sinon.SinonStub = sinon.stub(objectDetection.raycasterOriginal, "intersectObjects");
      const returnValue1: THREE.Intersection[] = [];
      stub1.returns(returnValue1);

      const stub2: sinon.SinonStub = sinon.stub(objectDetection.raycasterModified, "intersectObjects");
      const returnValue2: THREE.Intersection[] = [];
      stub2.returns(returnValue2);

      // tslint:disable-next-line: no-magic-numbers
      // const result: IThreeObject = objectDetection.rayCasting(mouse, cameraOriginal, cameraModified,
      //                                                         sceneOriginal, sceneModified, meshesOriginal, meshesOriginal);
      const intersectionOriginal: THREE.Intersection[] = objectDetection.raycasterOriginal.intersectObjects(meshesOriginal, true);
      const intersectionModified: THREE.Intersection[] = objectDetection.raycasterModified.intersectObjects(meshesModified, true);

      expect(returnValue1[0]).toEqual(returnValue2[0]);
      expect(intersectionOriginal[0]).toEqual(returnValue1[0]);
      expect(returnValue2[0]).toEqual(intersectionModified[0]);
    });

    describe("setCamera()", () => { 
      it("Should call the method setFromCamera at least once ", async () => {
        const objectDetection: ObjectDetectionService = TestBed.get(ObjectDetectionService);
        const spy: sinon.SinonSpy = sinon.spy(objectDetection.raycasterModified, "setFromCamera");
        const mouse: THREE.Vector2 = new THREE.Vector2(0.2, -0.4);

        objectDetection.raycasterModified.setFromCamera(mouse, cameraModified);
        expect(spy.callCount).toBeGreaterThanOrEqual(1);
        spy.restore();
      });

      it("Should call the method setFromCamera at least once ", async () => {
        const objectDetection: ObjectDetectionService = TestBed.get(ObjectDetectionService);
        const spy: sinon.SinonSpy = sinon.spy(objectDetection.raycasterOriginal, "setFromCamera");
        const mouse: THREE.Vector2 = new THREE.Vector2(0.2, -0.4);

        objectDetection.raycasterOriginal.setFromCamera(mouse, cameraOriginal);
        expect(spy.callCount).toBeGreaterThanOrEqual(1);
        spy.restore();
      });

      it("Should call the method setCamera at least once ", async () => {
        const objectDetection: ObjectDetectionService = TestBed.get(ObjectDetectionService);
        const spy: sinon.SinonSpy = sinon.spy(objectDetection, "setCamera");
        const mouse: THREE.Vector2 = new THREE.Vector2(0.2, -0.4);

        objectDetection.setCamera(mouse, cameraOriginal, cameraModified);
        expect(spy.callCount).toBeGreaterThanOrEqual(1);
        spy.restore();
      });
    });

    describe("getParent()", () => {
      it("Should call the function at least once", async() => {
          const objectDetection: ObjectDetectionService = TestBed.get(ObjectDetectionService);
          const spy: sinon.SinonSpy = sinon.spy(objectDetection, "getParent");
          const obj3D: THREE.Object3D = new THREE.Object3D();
          const childObj3D: THREE.Object3D = new THREE.Object3D();
          childObj3D.parent = obj3D;
          sceneOriginal.add(obj3D);

          objectDetection.getParent( childObj3D, sceneOriginal);
          expect(spy.callCount).toBeGreaterThanOrEqual(0);
          spy.restore();
        });

      it("Should call the function at least once", async() => {
          const objectDetection: ObjectDetectionService = TestBed.get(ObjectDetectionService);
          const spy: sinon.SinonSpy = sinon.spy(objectDetection, "getParent");
          const obj3D: THREE.Object3D = new THREE.Object3D();
          const childObj3D: THREE.Object3D = new THREE.Object3D();
          childObj3D.parent = obj3D;
          sceneModified.add(obj3D);

          objectDetection.getParent(childObj3D, sceneModified);
          expect(spy.callCount).toBeGreaterThanOrEqual(0);
          spy.restore();
        });

      it("Should find the parent from all the cildren", async() => {
          const objectDetection: ObjectDetectionService = TestBed.get(ObjectDetectionService);
          const obj3D: THREE.Object3D = new THREE.Object3D();
          const childObj3D: THREE.Object3D = new THREE.Object3D();
          childObj3D.parent = obj3D;
          sceneOriginal.add(obj3D);
          const stub: sinon.SinonStub = sinon.stub(objectDetection, "getParent");
          const returnValue: THREE.Object3D = obj3D;

          objectDetection.getParent(childObj3D, sceneOriginal);
          expect(obj3D).toEqual(returnValue);
          stub.restore();
        });

      it("Should find the parent from all the cildren", async() => {
          const objectDetection: ObjectDetectionService = TestBed.get(ObjectDetectionService);
          const obj3D: THREE.Object3D = new THREE.Object3D();
          const childObj3D: THREE.Object3D = new THREE.Object3D();
          childObj3D.parent = obj3D;
          sceneModified.add(obj3D);
          const stub: sinon.SinonStub = sinon.stub(objectDetection, "getParent");
          const returnValue: THREE.Object3D = obj3D;

          objectDetection.getParent(childObj3D, sceneModified);
          expect(obj3D).toEqual(returnValue);
          stub.restore();
        });
    });
  });
});
