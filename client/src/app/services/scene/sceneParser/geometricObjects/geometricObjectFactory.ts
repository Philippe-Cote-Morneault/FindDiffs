import * as THREE from "three";
import { ICommon3DPosition } from "../../../../../../../common/model/positions";
import { ICommonEulerAngles } from "../../../../../../../common/model/scene/eulerAngles";
import { ICommonGeometricObject } from "../../../../../../../common/model/scene/objects/geometricObjects/geometricObject";

export abstract class GeometricObjectFactory {
    public parse(sceneObject: ICommonGeometricObject): THREE.Object3D {
        const geometricObject: THREE.Object3D = this.createShape(this.createMeshMaterial(sceneObject.color),
                                                                 sceneObject);

        this.setPosition(sceneObject.position, geometricObject);

        this.setOrientation(sceneObject.orientation, geometricObject);

        geometricObject.userData = {id: sceneObject.id};

        return geometricObject;
    }

    protected abstract createShape(material: THREE.MeshPhongMaterial, geometricObject: ICommonGeometricObject): THREE.Object3D;

    private setPosition(position: ICommon3DPosition, geometricObject: THREE.Object3D): void {
        geometricObject.position.set(position.x, position.y, position.z);
    }

    private setOrientation(eulerAngles: ICommonEulerAngles, geometricObject: THREE.Object3D): void {
        geometricObject.rotation.x = eulerAngles.xAngle;
        geometricObject.rotation.y = eulerAngles.yAngle;
        geometricObject.rotation.z = eulerAngles.zAngle;

    }

    private createMeshMaterial(color: number): THREE.MeshPhongMaterial {
        return new THREE.MeshPhongMaterial({color: color});
    }
}
