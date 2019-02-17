import { ICommonSceneObject } from "./sceneObject";

export interface ICommonThematicObject extends ICommonSceneObject {
    texture: Textures;
    scale: number;
}

// TODO: Define what texture to put
export enum Textures {Test};