import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonGeometricScene, ICommonScene, ICommonThematicScene, Type } from "../../../../../../common/model/scene/scene";
import { GeometricObjectParser } from "./geometricObjectParser";
import { GeometricSceneParser } from "./geometricSceneParser";
import { SceneObjectParser } from "./sceneObjectParser";
import { ThematicObjectParser } from "./thematicObjectParser";
import { ThematicSceneParser } from "./thematicSceneParser";

@Injectable({
  providedIn: "root",
})
export class SceneParserService {
    private static readonly FOV: number = 75;

    private sceneObjectParser: SceneObjectParser;

    public parseScene(originalScene: ICommonScene, windowWidth: number, windowHeight: number): THREE.Scene {
        let scene: THREE.Scene;

        if (originalScene.type === Type.Geometric) {
            this.sceneObjectParser = new GeometricObjectParser();
            scene = GeometricSceneParser.parseScene(originalScene as ICommonGeometricScene);
        } else {
            this.sceneObjectParser = new ThematicObjectParser();
            scene = ThematicSceneParser.parseScene(originalScene as ICommonThematicScene);
        }

        originalScene.sceneObjects.forEach((object: ICommonSceneObject) => {
            scene.add(this.sceneObjectParser.parse(object));
        });

        return scene;
    }

    private createCamera(): THREE.PerspectiveCamera {
        const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
            SceneParserService.FOV, 
            window.innerWidth/window.innerHeight, 
            0.1, 
            1000 );
    }
}
