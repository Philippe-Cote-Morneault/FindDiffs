import * as THREE from "three";
import { ICommonGeometricScene, ICommonScene, ICommonThematicScene, ObjectType } from "../../../../../../common/model/scene/scene";
import { GeometricSceneParser } from "./geometricSceneParser";
import { GeometricObjectParser } from "./objectParser/geometricObjectParser";
import { ThematicObjectParser } from "./objectParser/thematicObjectParser";
import { SceneObjectParser } from "./sceneObjectParser";
import { ThematicSceneParser } from "./thematicSceneParser";

export abstract class AbstractSceneParser {
    protected sceneObjectParser: SceneObjectParser;
    protected sceneType: ObjectType;
    protected sceneModel: ICommonScene;

    protected constructor(sceneModel: ICommonScene) {
        this.sceneType = sceneModel.type;
        this.sceneModel = sceneModel;
        this.sceneObjectParser = (sceneModel.type === ObjectType.Geometric) ?
            new GeometricObjectParser() : new ThematicObjectParser();
    }

    protected async createScene(): Promise<THREE.Scene> {
        return (this.sceneModel.type === ObjectType.Geometric) ?
            GeometricSceneParser.parseScene(this.sceneModel as ICommonGeometricScene)
            : ThematicSceneParser.parseScene(this.sceneModel as ICommonThematicScene);

    }
}
