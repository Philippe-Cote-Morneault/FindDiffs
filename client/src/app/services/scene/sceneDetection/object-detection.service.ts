import { Injectable } from "@angular/core";
import * as THREE from "three";
import { IThreeObject } from "./IThreeObject";

@Injectable({
  providedIn: "root",
})

export class ObjectDetectionService {

  public raycaster: THREE.Raycaster = new THREE.Raycaster();
  public raycaster2: THREE.Raycaster = new THREE.Raycaster();

  public rayCasting(mouse: THREE.Vector2,
                    cameraOriginal: THREE.PerspectiveCamera,
                    cameraModified: THREE.PerspectiveCamera,
                    sceneOriginal: THREE.Scene,
                    sceneModified: THREE.Scene,
                    meshesOriginal: THREE.Object3D[],
                    meshesModified: THREE.Object3D[]): IThreeObject {
    this.setCamera(mouse, cameraOriginal, cameraModified);
    const intersectsOriginal: THREE.Intersection[] = this.raycaster.intersectObjects(meshesOriginal, true);
    const intersectsModified: THREE.Intersection[] = this.raycaster2.intersectObjects(meshesModified, true);

    const originalObject: THREE.Object3D = intersectsOriginal[0] ?
            this.getParent(intersectsOriginal[0].object, sceneOriginal) : new THREE.Object3D;
    const modifiedObject: THREE.Object3D = intersectsModified[0] ?
            this.getParent(intersectsModified[0].object, sceneModified) : new THREE.Object3D;

    return {
      original: originalObject,
      modified: modifiedObject,
    };
  }

  private getParent(obj: THREE.Object3D, scene: THREE.Scene): THREE.Object3D {
    if (obj.parent !== scene as THREE.Object3D) {
        obj = obj.parent as THREE.Object3D;
        obj = this.getParent(obj, scene);
    }

    return obj;
}

  private setCamera(mouse: THREE.Vector2, cameraOriginal: THREE.PerspectiveCamera, cameraModified: THREE.PerspectiveCamera): void {
    this.raycaster.setFromCamera(mouse, cameraOriginal);
    this.raycaster2.setFromCamera(mouse, cameraModified);
  }
}
