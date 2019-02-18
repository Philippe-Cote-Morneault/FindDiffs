import * as THREE from "three";
import { ICommonThematicObject } from "../../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { SceneObjectParser } from "../sceneObjectParser";

export class ThematicObjectParser extends SceneObjectParser {

    public parse(object: ICommonThematicObject): THREE.Object3D {
        // tslint:disable-next-line:no-suspicious-comment
        // TODO: Implement this method in sprint 3
        return new THREE.Object3D();
    }
}
