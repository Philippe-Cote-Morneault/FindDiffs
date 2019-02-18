import { Injectable } from "@angular/core";
import { ICommonScene, ObjectType } from "../../../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";

@Injectable({
    providedIn: "root",
})
export class ModifiedSceneParserService {

    private sceneObjectParser: SceneObjectParser;

    public parseModifiedScene(originalScene: ICommonScene, modifiedScene: ICommonSceneModifications): ICommonScene {
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
