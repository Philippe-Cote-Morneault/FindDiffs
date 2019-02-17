import * as THREE from "three";
import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { ICommonEulerAngles } from "../../../../../../common/model/scene/eulerAngles";
import { ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObject";

export abstract class GeometricObjectFactory {
    public parse(sceneObject: ICommonGeometricObject): THREE.Object3D {
        const geometricObject: THREE.Object3D = this.createShape(this.createMeshMaterial(sceneObject.color),
                                                                 sceneObject.dimensions);

        this.setPosition(sceneObject.position, geometricObject);

        this.setOrientation(sceneObject.orientation, geometricObject);

        geometricObject.userData = {id: sceneObject.id};

        return geometricObject;
    }

    protected abstract createShape(color: THREE.MeshBasicMaterial, dimensions: number[]): THREE.Object3D;

    private setPosition(position: ICommon3DPosition, geometricObject: THREE.Object3D): void {
        geometricObject.position.set(position.x, position.y, position.z);
    }

    private setOrientation(eulerAngles: ICommonEulerAngles, geometricObject: THREE.Object3D): void {
        geometricObject.setRotationFromEuler(new THREE.Euler(eulerAngles.xAngle, eulerAngles.yAngle, eulerAngles.zAngle));
    }

    // TODO: See if you need to convert to hex
    private createMeshMaterial(color: number): THREE.MeshBasicMaterial {
        return new THREE.MeshBasicMaterial({color: color});
    }
}
