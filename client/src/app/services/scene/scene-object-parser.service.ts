import { Injectable } from "@angular/core";
import { ICommonSceneObject, GeometricShape } from "../../../../../common/model/scene/sceneObject";
import * as THREE from "three";

@Injectable({
  providedIn: "root",
})
export class SceneObjectParserService {

    public parse(object: ICommonSceneObject): THREE.Object3D {
        object.type === 
    }

    private parseGeometricShape(shape: ICommonSceneObject): THREE.Object3D {

    }
  
}
