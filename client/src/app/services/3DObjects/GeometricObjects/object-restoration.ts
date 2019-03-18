import { Injectable } from "@angular/core";
import { DifferenceTypeObject3D } from "../../differenceTypeObject3D";
@Injectable({
    providedIn: "root",
})
export class ObjectRestoration {
    public static pixelDimension: number = 1;
    public static imageDataPixelSpace: number = 4;
    public originalContext: CanvasRenderingContext2D | null;
    public modifiedContext: CanvasRenderingContext2D | null;

    public restoreObject(hit: boolean, intersectsOriginal: THREE.Intersection[],
                         intersectsModified: THREE.Intersection[]): DifferenceTypeObject3D {

        let differenceType: DifferenceTypeObject3D = DifferenceTypeObject3D.none;

        return differenceType;
    }
}
