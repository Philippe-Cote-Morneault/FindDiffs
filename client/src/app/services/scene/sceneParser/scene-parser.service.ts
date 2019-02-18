import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonGeometricScene, ICommonScene, ICommonThematicScene, ObjectType } from "../../../../../../common/model/scene/scene";
import { GeometricSceneParser } from "./geometricSceneParser";
import { GeometricObjectParser } from "./objectParser/geometricObjectParser";
import { ThematicObjectParser } from "./objectParser/thematicObjectParser";
import { SceneObjectParser } from "./sceneObjectParser";
import { ThematicSceneParser } from "./thematicSceneParser";

@Injectable({
  providedIn: "root",
})
export class SceneParserService {

    private sceneObjectParser: SceneObjectParser;

    public parseScene(originalScene: ICommonScene, containerWidth: number, containerHeight: number): THREE.Scene {
        let scene: THREE.Scene;

        console.log(originalScene.type === ObjectType.Geometric);

        if (originalScene.type === ObjectType.Geometric) {
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
