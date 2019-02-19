import { Component, OnInit } from "@angular/core";
import * as THREE from "three";
/* tslint:disable */

import "src/js/test";
import "node_modules/three/examples/js/controls/OrbitControls";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { SceneParserService } from "../services/scene/sceneParser/scene-parser.service";
import { CameraGenerator } from "../services/scene/sceneRenderer/cameraGenerator";
import { SceneService } from "../services/scene/scene.service";
import { SceneRendererService } from "../services/scene/sceneRenderer/scene-renderer.service";

@Component({
    selector: "app-test",
    templateUrl: "./test.component.html",
    styleUrls: ["./test.component.css"],
})
export class TestComponent implements OnInit {
    private div: HTMLElement | null;

    public constructor(private sceneService: SceneService) {

    }

    public ngOnInit(): void {
        this.div = document.getElementById("3jstest");
        
        this.sceneService.createScene("Geometric", 200).subscribe((sceneModel: ICommonScene) => {
            if (this.div !== null) {
                const sceneRendererService: SceneRendererService = new SceneRendererService();
                const renderer: THREE.WebGLRenderer = sceneRendererService.generateRender(1000, 600);
                this.div.appendChild(renderer.domElement);
                const scene: THREE.Scene = new SceneParserService().parseScene(sceneModel);
                const camera: THREE.PerspectiveCamera = CameraGenerator.createCamera(1000, 600);
                const controls: THREE.OrbitControls = new THREE.OrbitControls(camera, renderer.domElement);

                let animate = () =>  {
                    requestAnimationFrame( animate );
        
                    sceneRendererService.renderScene(scene, renderer, camera);

                    controls.update();
                };
                animate();
           }
       })
    }
}
