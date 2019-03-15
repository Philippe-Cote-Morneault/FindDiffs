import { ICommonSceneObject } from "../sceneObject";

export enum ObjThemeType {
    bench, bin, cone, eclipse, lambo, lamp, lexus, sign_forbidden, sign_skip, sign_stop
};

export interface ICommonThematicObject extends ICommonSceneObject {
    isTextured: boolean;
    texture?: string;
    color?: number;
    scale: number;
    objectType: ObjThemeType;
}
