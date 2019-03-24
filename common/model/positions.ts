import { ObjectType } from "./scene/scene";

export interface ICommon3DPosition {
    x: number;
    y: number;
    z: number;
}

export interface ICommon2DPosition{
    x: number;
    y: number;
}

export interface ICommon3DObject {
    scenePairId: string;
    originalObjectId: string;
    modifiedObjectId: string;
    gameType: ObjectType;
}