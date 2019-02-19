import { Injectable } from "@angular/core";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonGeometricScene, ICommonScene, ICommonThematicScene, ObjectType } from "../../../../../../common/model/scene/scene";
import { GeometricSceneParser } from "./geometricSceneParser";
import { GeometricObjectParser } from "./objectParser/geometricObjectParser";
import { ThematicObjectParser } from "./objectParser/thematicObjectParser";
import { SceneObjectParser } from "./sceneObjectParser";
import { ThematicSceneParser } from "./thematicSceneParser";
import { SceneParserService } from "./scene-parser.service";

@Injectable({
    providedIn: "root",
})
export class ModifiedSceneParserService {

    private sceneObjectParser: SceneObjectParser;

    public parseModifiedScene(originalScene: ICommonScene, sceneModifications: ICommonSceneModifications): THREE.Scene {
        let scene: THREE.Scene;

        if (originalScene.type === ObjectType.Geometric) {
            this.sceneObjectParser = new GeometricObjectParser();
            scene = GeometricSceneParser.parseScene(originalScene as ICommonGeometricScene);
        } else {
            this.sceneObjectParser = new ThematicObjectParser();
            scene = ThematicSceneParser.parseScene(originalScene as ICommonThematicScene);
        }

        this.parseObjects(scene, sceneModifications, originalScene.sceneObjects);

        return scene;
    }

    private parseObjects(scene: THREE.Scene, sceneModifications: ICommonSceneModifications,
                         originalSceneObjects: ICommonSceneObject[]): void {

        originalSceneObjects.forEach((sceneObject => {
            if (sceneModifications.deletedObjects.includes(sceneObject.id)) {

            } 
            else if (sceneModifications)

            }
        }))
        this.deleteSceneObjects(scene.children, sceneModifications.deletedObjects);
    }

    private deleteSceneObjects(sceneObjects: THREE.Object3D[], objectIdsToDelete: String[]): void {
        objectIdsToDelete.forEach((objectIdToDelete: String) => {

        })
    }


}
