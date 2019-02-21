import { Injectable } from "@angular/core";
import "src/js/test";
// tslint:disable-next-line:ordered-imports
import "node_modules/three/examples/js/controls/OrbitControls";
import * as THREE from "three";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../../../common/model/scene/scene";
import { ModifiedSceneParserService } from "../../../services/scene/sceneParser/modified-scene-parser.service";
import { SceneParserService } from "../../../services/scene/sceneParser/scene-parser.service";
import { CameraGenerator } from "../../../services/scene/sceneRenderer/cameraGenerator";
import { SceneRendererService } from "../../../services/scene/sceneRenderer/scene-renderer.service";
import { SceneService } from "../scene.service";

@Injectable({
    providedIn: "root",
})

export class SceneLoaderService {

    public constructor(public sceneService: SceneService) {
    }
    // tslint:disable:no-any
    public loadOriginalScene(div: HTMLElement | null, scene: ICommonScene): void {

        if (div !== null) {
            const sceneRendererService: SceneRendererService = new SceneRendererService();
            const renderer: THREE.WebGLRenderer = sceneRendererService.generateRender(div.clientWidth, div.clientHeight);

            div.appendChild(renderer.domElement);

            const sceneOriginal: THREE.Scene = new SceneParserService().parseScene(scene);
            const camera: THREE.PerspectiveCamera = CameraGenerator.createCamera(div.clientWidth, div.clientHeight);
            const controls: THREE.OrbitControls = new THREE.OrbitControls(camera, renderer.domElement);

            const animate: any = (): void => {
                requestAnimationFrame(animate);
                sceneRendererService.renderScene(sceneOriginal, renderer, camera);
                controls.update();
            };
            animate();
        }
    }

    public loadModifiedScene(div: HTMLElement | null, scene: ICommonScene, response: ICommonSceneModifications): void {

        if (div !== null) {
            const sceneRendererService: SceneRendererService = new SceneRendererService();
            const renderer: THREE.WebGLRenderer = sceneRendererService.generateRender(div.clientWidth, div.clientHeight);

            div.appendChild(renderer.domElement);

            const sceneModified: THREE.Scene = new ModifiedSceneParserService().parseModifiedScene(scene, response);
            const camera: THREE.PerspectiveCamera = CameraGenerator.createCamera(div.clientWidth, div.clientHeight);
            const controls: THREE.OrbitControls = new THREE.OrbitControls(camera, renderer.domElement);

            const animate: any = (): void => {
                requestAnimationFrame(animate);
                sceneRendererService.renderScene(sceneModified, renderer, camera);
                controls.update();
            };
            animate();
        }
    }
}
