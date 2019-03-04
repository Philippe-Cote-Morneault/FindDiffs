import { Injectable } from "@angular/core";
import "src/js/three";
// tslint:disable-next-line:ordered-imports
import "node_modules/three/examples/js/controls/OrbitControls";
import * as THREE from "three";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../../../common/model/scene/scene";
import { ModifiedSceneParserService } from "../../../services/scene/sceneParser/modified-scene-parser.service";
import { SceneParserService } from "../../../services/scene/sceneParser/scene-parser.service";
import { CameraGenerator } from "../../../services/scene/sceneRenderer/cameraGenerator";
import { ControlsGenerator } from "../sceneRenderer/controlsGenerator";
import { RendererGenerator } from "../sceneRenderer/rendererGenerator";

@Injectable({
    providedIn: "root",
})

export class SceneLoaderService {
    public camera: THREE.PerspectiveCamera;
    public controls: THREE.OrbitControls;

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;

    public static syncScenes(camera1: THREE.PerspectiveCamera, controls1: THREE.OrbitControls,
                             camera2: THREE.PerspectiveCamera, controls2: THREE.OrbitControls): void {

        controls1.addEventListener("change", () => {
            camera2.position.copy(camera1.position);
            camera2.rotation.copy(camera1.rotation);
            controls2.target.copy(controls1.target);
            controls2.update();
            },
        );

        controls2.addEventListener("change", () => {
            camera1.position.copy(camera2.position);
            camera1.rotation.copy(camera2.rotation);
            controls1.target.copy(controls2.target);
            controls1.update();
            },
        );
    }

    public loadOriginalScene(container: HTMLElement | null, scene: ICommonScene, inGameMode: boolean): void {
        this.scene = new SceneParserService().parseScene(scene);

        this.renderScene(container, inGameMode);
    }

    public loadModifiedScene(container: HTMLElement | null, scene: ICommonScene, sceneModifications: ICommonSceneModifications): void {
        this.scene = new ModifiedSceneParserService().parseModifiedScene(scene, sceneModifications);

        this.renderScene(container, true);
    }

    private renderScene(container: HTMLElement | null, inGameMode: boolean): void {
        if (container) {
            this.renderer = RendererGenerator.generateRenderer(container.clientWidth,
                                                               container.clientHeight);
            container.appendChild(this.renderer.domElement);
            this.camera = CameraGenerator.createCamera(container.clientWidth, container.clientHeight);
            this.generateControls(inGameMode, this.camera, this.renderer.domElement);
            this.animate();
        }
    }

    private animate: Function = () => {
        requestAnimationFrame(this.animate as FrameRequestCallback);
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

    private generateControls(inGameMode: boolean, camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement): void {
        this.controls = inGameMode ?
            ControlsGenerator.generateGameControls(camera, canvas) :
            ControlsGenerator.generateGameCardControls(camera, canvas);
    }
}
