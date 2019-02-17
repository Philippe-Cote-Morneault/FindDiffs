import * as THREE from "three";
import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { ICommonEulerAngles } from "../../../../../../common/model/scene/eulerAngles";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";

export abstract class GeometricObject {
    public parse(sceneObject: ICommonSceneObject): THREE.Object3D {
        const geometricObject: THREE.Object3D = this.createShape(sceneObject);

        this.setPosition(sceneObject.position, geometricObject);

        this.setOrientation(sceneObject.orientation, geometricObject);

        return geometricObject;
    }

    protected abstract createShape(sceneObject: ICommonSceneObject): THREE.Object3D;

    private setPosition(position: ICommon3DPosition, geometricObject: THREE.Object3D): void {
        geometricObject.position.set(position.x, position.y, position.z);
    }

    private setOrientation(eulerAngles: ICommonEulerAngles, geometricObject: THREE.Object3D): void {
        geometricObject.setRotationFromEuler(new THREE.Euler(eulerAngles.xAngle, eulerAngles.yAngle, eulerAngles.zAngle));
    }
}
