import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";

export abstract class SceneObjectParser {
    public abstract parse(object: ICommonSceneObject): THREE.Object3D;
}
