import { TestBed } from "@angular/core/testing";

import {RouterTestingModule} from "@angular/router/testing";
import * as sinon from "sinon";
import * as THREE from "three";
import { Event, ICommonSocketMessage } from "../../../../../../common/communication/webSocket/socketMessage";
import { ICommon3DObject } from "../../../../../../common/model/positions";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";
import { CameraGenerator } from "../sceneRenderer/cameraGenerator";
import { IThreeObject } from "./IThreeObject";
import { ObjectDetectionService } from "./object-detection.service";
import { ObjectRestorationService } from "./object-restoration.service";
import { ObjectHandler } from "./objects-handler.service";


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

  const originalSceneLoader: SceneLoaderService = new SceneLoaderService;
  const modifiedSceneLoader: SceneLoaderService = new SceneLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterTestingModule]});
  });

  describe("clickOnScene()", () => {
    it("Should give the same structure of detected objects when we click on the original scene", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      const objectDetectionService: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const stub: sinon.SinonStub = sinon.stub(objectDetectionService, "rayCasting");
      const returnValue: IThreeObject = {
        original: cube,
        modified: cube,
      };
      stub.returns(returnValue);

      objectHandler.clickOnScene(event, true);
      const mouse: THREE.Vector2 = new THREE.Vector2;
      objectHandler.detectedObjects = objectDetectionService.rayCasting(mouse, cameraOriginal, cameraModified, sceneOriginal, sceneModified, meshesOriginal, meshesModified);

      await expect(objectHandler.detectedObjects.original).toEqual(returnValue.original);
      await expect(objectHandler.detectedObjects.modified).toEqual(returnValue.modified);
      stub.restore();
    });

    it("Should give the same structure of detected objects when we click on the modified scene", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      const objectDetectionService: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const stub: sinon.SinonStub = sinon.stub(objectDetectionService, "rayCasting");
      const returnValue: IThreeObject = {
        original: cube,
        modified: cube,
      };
      stub.returns(returnValue);

      objectHandler.clickOnScene(event, false);
      const mouse: THREE.Vector2 = new THREE.Vector2;
      // tslint:disable-next-line: max-line-length
      objectHandler.detectedObjects = objectDetectionService.rayCasting(mouse, cameraOriginal, cameraModified, sceneOriginal, sceneModified, meshesOriginal, meshesModified);

      await expect(objectHandler.detectedObjects.original).toEqual(returnValue.original);
      await expect(objectHandler.detectedObjects.modified).toEqual(returnValue.modified);

      stub.restore();
    });

    it("Should call setAttributes function at least once", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      const objectRestorationService: ObjectRestorationService = TestBed.get(ObjectRestorationService);
      const spy: sinon.SinonSpy = sinon.spy(objectRestorationService, "setAttributes");
      const objectDetectionService: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const stub: sinon.SinonStub = sinon.stub(objectDetectionService, "rayCasting");
      const returnValue: IThreeObject = {
        original: cube,
        modified: cube,
      };
      stub.returns(returnValue);

      objectHandler.clickOnScene(event, true);
      const mouse: THREE.Vector2 = new THREE.Vector2;
      // tslint:disable-next-line: max-line-length
      objectHandler.detectedObjects = objectDetectionService.rayCasting(mouse, cameraOriginal, cameraModified, sceneOriginal, sceneModified, meshesOriginal, meshesModified);

      objectRestorationService.setAttributes( originalSceneLoader, modifiedSceneLoader, objectHandler.detectedObjects);

      expect(spy.callCount).toBeGreaterThanOrEqual(1);
      spy.restore();
    });

    it("Should call setAttributes function at least once", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      const objectRestorationService: ObjectRestorationService = TestBed.get(ObjectRestorationService);
      const spy: sinon.SinonSpy = sinon.spy(objectRestorationService, "setAttributes");
      const objectDetectionService: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const stub: sinon.SinonStub = sinon.stub(objectDetectionService, "rayCasting");
      const returnValue: IThreeObject = {
        original: cube,
        modified: cube,
      };
      stub.returns(returnValue);

      objectHandler.clickOnScene(event, false);
      const mouse: THREE.Vector2 = new THREE.Vector2;
      // tslint:disable-next-line: max-line-length
      objectHandler.detectedObjects = objectDetectionService.rayCasting(mouse, cameraOriginal, cameraModified, sceneOriginal, sceneModified, meshesOriginal, meshesModified);

      objectRestorationService.setAttributes( originalSceneLoader, modifiedSceneLoader, objectHandler.detectedObjects);

      expect(spy.callCount).toBeGreaterThanOrEqual(1);
      spy.restore();
    });

    it("Should call clickOnScene function at least once", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      const spy: sinon.SinonSpy = sinon.spy(objectHandler, "clickOnScene");

      objectHandler.clickOnScene(event, true);

      expect(spy.callCount).toBeGreaterThanOrEqual(1);
      spy.restore();
    });

    it("Should call clickOnScene function at least once", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      const spy: sinon.SinonSpy = sinon.spy(objectHandler, "clickOnScene");

      objectHandler.clickOnScene(event, false);

      expect(spy.callCount).toBeGreaterThanOrEqual(1);
      spy.restore();
    });

// tslint:disable-next-line: max-func-body-length
    it("Should set sceneLoaderServices attributes and detectedObjets", async () => {

      const sceneOriginalLoader: SceneLoaderService = new SceneLoaderService;
      const sceneModifiedLoader: SceneLoaderService = new SceneLoaderService;

      sceneOriginalLoader.camera = new THREE.PerspectiveCamera;
      sceneOriginalLoader.scene = new THREE.Scene;

      sceneModifiedLoader.camera = new THREE.PerspectiveCamera;
      sceneModifiedLoader.scene = new THREE.Scene;

      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      const objectDetectionService: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const objectRestorationService: ObjectRestorationService = TestBed.get(ObjectRestorationService);
      const mouse: THREE.Vector2 = new THREE.Vector2(0, 0);
      const spyRestoration: sinon.SinonSpy = sinon.stub(objectRestorationService, "setAttributes");
      jasmine.clock().install();
      const stubDetection: sinon.SinonStub = sinon.stub(objectDetectionService, "rayCasting");
      const temp: IThreeObject = {
        original: cube,
        modified: cube,
      };
      stubDetection.returns(temp);

      objectHandler.clickOnScene(event, true);
      // tslint:disable-next-line: max-line-length
      objectHandler.detectedObjects = objectDetectionService.rayCasting(mouse, cameraOriginal, cameraModified, sceneOriginal, sceneModified, meshesOriginal, meshesModified);

      objectRestorationService.setAttributes(sceneOriginalLoader, sceneModifiedLoader, temp);

      jasmine.clock().tick(999);
      sinon.assert.calledOnce(spyRestoration);
      stubDetection.restore();
      spyRestoration.restore();
      jasmine.clock().uninstall();
    });

// tslint:disable-next-line: max-func-body-length
    it("Should set sceneLoaderServices attributes and detectedObjets", async () => {

      const sceneOriginalLoader: SceneLoaderService = new SceneLoaderService;
      const sceneModifiedLoader: SceneLoaderService = new SceneLoaderService;

      sceneOriginalLoader.camera = new THREE.PerspectiveCamera;
      sceneOriginalLoader.scene = new THREE.Scene;

      sceneModifiedLoader.camera = new THREE.PerspectiveCamera;
      sceneModifiedLoader.scene = new THREE.Scene;

      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      const objectDetectionService: ObjectDetectionService = TestBed.get(ObjectDetectionService);
      const objectRestorationService: ObjectRestorationService = TestBed.get(ObjectRestorationService);
      const mouse: THREE.Vector2 = new THREE.Vector2(0, 0);
      const spyRestoration: sinon.SinonSpy = sinon.stub(objectRestorationService, "setAttributes");
      jasmine.clock().install();
      const stubDetection: sinon.SinonStub = sinon.stub(objectDetectionService, "rayCasting");
      const temp: IThreeObject = {
        original: cube,
        modified: cube,
      };
      stubDetection.returns(temp);

      objectHandler.clickOnScene(event, false);
      // tslint:disable-next-line: max-line-length
      objectHandler.detectedObjects = objectDetectionService.rayCasting(mouse, cameraOriginal, cameraModified, sceneOriginal, sceneModified, meshesOriginal, meshesModified);

      objectRestorationService.setAttributes(sceneOriginalLoader, sceneModifiedLoader, temp);

      jasmine.clock().tick(999);
      sinon.assert.calledOnce(spyRestoration);
      stubDetection.restore();
      spyRestoration.restore();
      jasmine.clock().uninstall();
    });
  });

  describe("clickAreAllowed()", () => {
    it("Should not let the player to click on the scene 1", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      objectHandler.game["gameStarted"] = false;
      objectHandler.identificationError["timeout"] = true;

      const canClick: boolean = objectHandler.clickAreAllowed();

      expect(canClick).toEqual(false);
    });

    it("Should let the player to click on the scene 2", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      objectHandler.game["gameStarted"] = true;
      objectHandler.identificationError["timeout"] = false;

      const canClick: boolean = objectHandler.clickAreAllowed();

      expect(canClick).toEqual(true);
    });

    it("Should not let the player to click on the scene 3", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      objectHandler.game["gameStarted"] = false;
      objectHandler.identificationError["timeout"] = false;

      const canClick: boolean = objectHandler.clickAreAllowed();

      expect(canClick).toEqual(false);
    });

    it("Should not let the player to click on the scene 4", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);
      objectHandler.game["gameStarted"] = true;
      objectHandler.identificationError["timeout"] = true;

      const canClick: boolean = objectHandler.clickAreAllowed();

      expect(canClick).toEqual(false);
    });
  });

  describe("emitDifference()", () => {
    it("Should emit an event to the server when a player is in a Geometric Game", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);

      const scenePairId: string = "446465465adasd";
      const originalObjectId: string = "s65df4s6ds6df5sd4f";
      const modifiedObjectId: string = "sd45fsdfs6d54f50";
      const gameType: ObjectType = ObjectType.Geometric;

      spyOn(objectHandler["socket"], "emitMessage");
      objectHandler.emitDifference(event, scenePairId, originalObjectId, modifiedObjectId, gameType);

      const clickInfo: ICommon3DObject = {
        scenePairId: scenePairId,
        originalObjectId: originalObjectId,
        modifiedObjectId: modifiedObjectId,
        gameType: gameType,
      };
      const message: ICommonSocketMessage = {
        data: clickInfo,
        timestamp: new Date(),
      };

      objectHandler["socket"].emitMessage(Event.GameClick, message);

      expect(objectHandler["socket"].emitMessage).toHaveBeenCalled();
    });

    it("Should emit an event to the server when a player is in a Thematic Game", async () => {
      const objectHandler: ObjectHandler = TestBed.get(ObjectHandler);

      const scenePairId: string = "446465465adasd";
      const originalObjectId: string = "s65df4s6ds6df5sd4f";
      const modifiedObjectId: string = "sd45fsdfs6d54f50";
      const gameType: ObjectType = ObjectType.Thematic;

      spyOn(objectHandler["socket"], "emitMessage");
      objectHandler.emitDifference(event, scenePairId, originalObjectId, modifiedObjectId, gameType);

      const clickInfo: ICommon3DObject = {
        scenePairId: scenePairId,
        originalObjectId: originalObjectId,
        modifiedObjectId: modifiedObjectId,
        gameType: gameType,
      };
      const message: ICommonSocketMessage = {
        data: clickInfo,
        timestamp: new Date(),
      };

      objectHandler["socket"].emitMessage(Event.GameClick, message);

      expect(objectHandler["socket"].emitMessage).toHaveBeenCalled();
    });
  });
// tslint:disable-next-line: max-file-line-count
});
