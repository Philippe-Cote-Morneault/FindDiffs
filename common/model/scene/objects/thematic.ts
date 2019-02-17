import { ICommonSceneObject } from "./sceneObject";

export interface ICommonThematicObject extends ICommonSceneObject {
    texture: Textures;
}

// TODO: Define what texture to put
export enum Textures {};