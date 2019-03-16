import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";

export abstract class SceneObjectParser {
    public abstract async parse(object: ICommonSceneObject): Promise<THREE.Object3D>;
}
