import * as THREE from "three";
import { ICommonGeometricScene, ICommonScene, ICommonThematicScene, ObjectType } from "../../../../../../common/model/scene/scene";
import { GeometricSceneParser } from "./geometricSceneParser";
import { GeometricObjectParser } from "./objectParser/geometricObjectParser";
import { ThematicObjectParser } from "./objectParser/thematicObjectParser";
import { SceneObjectParser } from "./sceneObjectParser";
import { ThematicSceneParser } from "./thematicSceneParser";

export abstract class AbstractSceneParser {
    protected sceneObjectParser: SceneObjectParser;

    protected async createScene(sceneModel: ICommonScene): Promise<THREE.Scene> {
        let scene: THREE.Scene;

        if (sceneModel.type === ObjectType.Geometric) {
            this.sceneObjectParser = new GeometricObjectParser();
            scene = GeometricSceneParser.parseScene(sceneModel as ICommonGeometricScene);
        } else {
            this.sceneObjectParser = new ThematicObjectParser();
            scene = await ThematicSceneParser.parseScene(sceneModel as ICommonThematicScene);
        }

        return scene;
    }
}
