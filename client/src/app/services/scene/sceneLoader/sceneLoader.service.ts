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
import { SceneRendererService } from "../../../services/scene/sceneRenderer/scene-renderer.service";

@Injectable({
    providedIn: "root",
})

export class SceneLoaderService {
    // tslint:disable:no-any
    public loadOriginalScene(container: HTMLElement | null, scene: ICommonScene): void {
        const parsedScene: THREE.Scene = new SceneParserService().parseScene(scene);

        this.renderScene(container, parsedScene);
    }

    public loadModifiedScene(container: HTMLElement | null, scene: ICommonScene, sceneModifications: ICommonSceneModifications): void {
        const parsedModifiedScene: THREE.Scene = new ModifiedSceneParserService().parseModifiedScene(scene, sceneModifications);

        this.renderScene(container, parsedModifiedScene);
    }

    private renderScene(container: HTMLElement | null, scene: THREE.Scene): void {
        if (container !== null) {
            const sceneRendererService: SceneRendererService = new SceneRendererService();
            const renderer: THREE.WebGLRenderer = sceneRendererService.generateRenderer(container.clientWidth,
                                                                                        container.clientHeight);

            container.appendChild(renderer.domElement);

            const camera: THREE.PerspectiveCamera = CameraGenerator.createCamera(container.clientWidth, container.clientHeight);
            const controls: THREE.OrbitControls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableKeys = false;

            const animate: any = (): void => {
                requestAnimationFrame(animate);
                sceneRendererService.renderScene(scene, renderer, camera);
                controls.update();
            };

            // tslint:disable-next-line:no-magic-numbers
            controls.target.set(0, 10, 0);

            animate();
        }
    }
}
