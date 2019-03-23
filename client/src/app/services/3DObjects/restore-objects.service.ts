import { Injectable } from "@angular/core";
import { ThematicObjectParser } from "../scene/sceneParser/objectParser/thematicObjectParser";
import { IThreeScene } from "./GeometricObjects/IThreeObject";

@Injectable({
  providedIn: "root",
})
export class RestoreObjectsService {

  private differenceFound: string[];

  public constructor() {
    this.differenceFound = [];
  }

  public addObject(objectOriginal: THREE.Object3D, scene: IThreeScene): void {
      if (this.isANewDifference(objectOriginal.userData.id)) {
          scene.original.children.forEach((element) => {
              if (element.userData.id === objectOriginal.userData.id) {
                  scene.modified.add(element.clone());
              }
          });
      }
  }

  public removeObject(objectModified: THREE.Object3D, scene: IThreeScene): void {
      if (this.isANewDifference(objectModified.userData.id)) {
        scene.modified.children.forEach((element) => {
              if (element.userData.id === objectModified.userData.id) {
                  scene.modified.remove(element);
              }
          });
      }
  }

  public changeColorObject(objectOriginal: THREE.Object3D, objectModified: THREE.Object3D): void {
      if (this.isANewDifference(objectModified.userData.id)) {
          // tslint:disable-next-line:no-any
          (objectModified as any).material.color.setHex((objectOriginal as any).material.color.getHex());
      }
  }

  public async changeTextureObject(objectOriginal: THREE.Object3D, objectModified: THREE.Object3D,
                                   thematicObjectParser: ThematicObjectParser): Promise<void> {
      if (this.isANewDifference(objectModified.userData.id)) {
          if (objectModified.userData.isTextured) {
              if (objectModified.type === "Mesh") {
                  await thematicObjectParser.loadTexture(objectModified, objectModified.name, objectOriginal.userData.texture);
              } else {
                  objectModified.traverse(async (child: THREE.Mesh) => {
                      await thematicObjectParser.loadTexture(child, child.name, objectOriginal.userData.texture);
                  });
              }
          }
      }
  }

  private isANewDifference(differenceId: string): boolean {
    return !this.differenceFound.includes(differenceId);
  }
}
