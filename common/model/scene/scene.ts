import { ICommonSceneObject } from "./sceneObject";

export interface ICommonScene {
    sceneObjects: ICommonSceneObject[];
    bg_color: string;
    texture: string;
    id: string;
}

