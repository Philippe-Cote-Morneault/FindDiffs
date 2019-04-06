import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../../../common/model/scene/scene";
import { CameraGenerator } from "../../../services/scene/sceneRenderer/cameraGenerator";
import { ISceneBoundingBox } from "../sceneParser/ISceneBoundingBox";
import { ModifiedSceneParserService } from "../sceneParser/modifiedSceneParser.service";
import { SceneParserService } from "../sceneParser/sceneParser.service";
import { ControlsGenerator } from "../sceneRenderer/controlsGenerator";
import { RendererGenerator } from "../sceneRenderer/rendererGenerator";

@Injectable({
    providedIn: "root",
})

export class SceneLoaderService {
    public static bbox: THREE.Box3[] = new Array<THREE.Box3>();
    public camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    public scene: THREE.Scene;

    public async loadOriginalScene(container: HTMLElement | null, scene: ICommonScene): Promise<void> {
        const sceneBoundingBox: ISceneBoundingBox = await new SceneParserService(scene).parseScene();
        this.scene = sceneBoundingBox.scene;
        sceneBoundingBox.bbox.forEach((element: THREE.Box3) => {
            SceneLoaderService.bbox.push(element);
        });
        this.renderScene(container);
    }

    public async loadModifiedScene(
            container: HTMLElement | null,
            scene: THREE.Scene,
            sceneModifications: ICommonSceneModifications,
        ): Promise<void> {
        // tslint:disable-next-line:max-line-length
        const sceneBoundingBox: ISceneBoundingBox = await new ModifiedSceneParserService(sceneModifications.type).parseModifiedScene(scene, sceneModifications);
        this.scene = sceneBoundingBox.scene;

        sceneBoundingBox.bbox.forEach((element: THREE.Box3) => {
            SceneLoaderService.bbox.push(element);
        });
        this.renderScene(container);
    }

    public async loadOnCanvas(canvas: HTMLCanvasElement, scene: ICommonScene): Promise<void> {
        const sceneBoundingBox: ISceneBoundingBox = await new SceneParserService(scene).parseScene();
        this.scene = sceneBoundingBox.scene;
        this.renderOnCanvas(canvas);
    }

    // tslint:disable-next-line:max-func-body-length
    private renderScene(container: HTMLElement | null): void {
        if (container) {
            this.renderer = RendererGenerator.generateRenderer(container.clientWidth,
                                                               container.clientHeight);
            container.appendChild(this.renderer.domElement);
            this.camera = CameraGenerator.createCamera(container.clientWidth, container.clientHeight);

            const geometry2: THREE.BoxGeometry = new THREE.BoxGeometry( );
            const material2: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
            const cube2: THREE.Mesh = new THREE.Mesh( geometry2, material2 );
            cube2.position.set(this.camera.position.x, (this.camera.position.y ), this.camera.position.z);

            const bboxCam: THREE.Box3 = new THREE.Box3().setFromObject(cube2);
            const helper: THREE.BoxHelper = new THREE.BoxHelper(cube2);
            this.scene.add(cube2);
            this.scene.add(helper);
            ControlsGenerator.generateGameControls(this.camera, helper, cube2, SceneLoaderService.bbox, bboxCam, container);
            this.animate();
        }
    }

    private renderOnCanvas(canvas: HTMLCanvasElement): void {
        if (canvas) {
            this.renderer = RendererGenerator.generateRendererOnCanvas(canvas);
            this.camera = CameraGenerator.createCamera(canvas.width, canvas.height);
            this.animate();
        }
    }

    private animate: Function = () => {
        requestAnimationFrame(this.animate as FrameRequestCallback);
        this.renderer.render(this.scene, this.camera);
    }
}
