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
        if (intersectsOriginal.length > 0 && intersectsModified.length > 0) {
            if (hit) {
                // tslint:disable:no-any
                let intersectedModified: any;
                let intersectedOriginal: any;
                intersectedOriginal = intersectsOriginal[0].object;
                intersectedModified = intersectsModified[0].object;

                intersectedModified.material.color.getHex() !== intersectedOriginal.material.color.getHex() ?
                    differenceType = DifferenceTypeObject3D.colorObject : differenceType = DifferenceTypeObject3D.none;

            } else if (intersectsOriginal[0].distance > intersectsModified[0].distance) {
                differenceType = DifferenceTypeObject3D.removeObject;
            } else if (intersectsOriginal[0].distance < intersectsModified[0].distance) {
                differenceType = DifferenceTypeObject3D.addObject;
            }
            // tslint:disable-next-line:prefer-conditional-expression

        return differenceType;
    }
}
