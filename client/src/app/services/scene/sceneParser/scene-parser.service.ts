import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonGeometricScene, ICommonScene, ICommonThematicScene, Type } from "../../../../../../common/model/scene/scene";
import { GeometricObjectParser } from "./objectParser/geometricObjectParser";
import { GeometricSceneParser } from "./geometricSceneParser";
import { SceneObjectParser } from "./sceneObjectParser";
import { ThematicObjectParser } from "./objectParser/thematicObjectParser";
import { ThematicSceneParser } from "./thematicSceneParser";

@Injectable({
  providedIn: "root",
})
export class SceneParserService {

    private sceneObjectParser: SceneObjectParser;

    public parseScene(originalScene: ICommonScene, containerWidth: number, containerHeight: number): THREE.Scene {
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

}
