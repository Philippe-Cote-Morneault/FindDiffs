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

    protected abstract createShape(color: THREE.MeshStandardMaterial, geometricObject: ICommonGeometricObject): THREE.Object3D;

    private setPosition(position: ICommon3DPosition, geometricObject: THREE.Object3D): void {
        geometricObject.position.set(position.x, position.z, position.y);
    }

    private setOrientation(eulerAngles: ICommonEulerAngles, geometricObject: THREE.Object3D): void {
        geometricObject.setRotationFromEuler(new THREE.Euler(eulerAngles.xAngle, eulerAngles.yAngle, eulerAngles.zAngle));
    }

    // tslint:disable-next-line:no-suspicious-comment
    // TODO: See if you need to convert to hex
    private createMeshMaterial(color: number): THREE.MeshStandardMaterial {
        return new THREE.MeshStandardMaterial({color: color, roughness: 0.95, metalness: 0.5, flatShading: true});
    }
}
