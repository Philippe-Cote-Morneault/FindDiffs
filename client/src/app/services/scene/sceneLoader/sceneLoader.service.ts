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
import { RendererGenerator } from "../sceneRenderer/rendererGenerator";

@Injectable({
    providedIn: "root",
})

export class SceneLoaderService {
    public camera: THREE.PerspectiveCamera;
    //public controls: THREE.OrbitControls;

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;

    public loadOriginalScene(container: HTMLElement | null, scene: ICommonScene, inGameMode: boolean): void {
        this.scene = new SceneParserService().parseScene(scene);
        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add(axesHelper);

        this.renderScene(container, inGameMode);
    }

    public loadModifiedScene(container: HTMLElement | null, scene: ICommonScene, sceneModifications: ICommonSceneModifications): void {
        this.scene = new ModifiedSceneParserService().parseModifiedScene(scene, sceneModifications);

        this.renderScene(container, true);
    }

    public loadOnCanvas(canvas: HTMLCanvasElement, scene: ICommonScene): void {
        this.scene = new SceneParserService().parseScene(scene);

        this.renderOnCanvas(canvas);
    }

    private renderScene(container: HTMLElement | null, inGameMode: boolean): void {
        if (container) {
            this.renderer = RendererGenerator.generateRenderer(container.clientWidth,
                                                               container.clientHeight);
            container.appendChild(this.renderer.domElement);
           // console.log(container);
            this.camera = CameraGenerator.createCamera(container.clientWidth, container.clientHeight);
            //this.generateControls(inGameMode, this.camera, this.renderer.domElement);
            this.animate();
        }
    }

    private renderOnCanvas(canvas: HTMLCanvasElement): void {
        if (canvas) {
            this.renderer = RendererGenerator.generateRendererOnCanvas(canvas);
            this.camera = CameraGenerator.createCamera(canvas.width, canvas.height);
            //this.generateControls(false, this.camera, canvas);
            this.animate();
        }
    }

    private animate: Function = () => {
        requestAnimationFrame(this.animate as FrameRequestCallback);
        this.renderer.render(this.scene, this.camera);
        //this.controls.update();
    }

    /*
    private generateControls(inGameMode: boolean, camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement): void {
        inGameMode ?
            ControlsGenerator.generateGameControls(camera, canvas) :
            ControlsGenerator.generateGameCardControls(camera, canvas);
    }
    */
}
