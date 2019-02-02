import { ICommonImagePair } from "./imagePair";

export interface ICommonGameCard {
    guid: string,
    pov: POVType,
    title: string,
    images: ICommonImagePair,
    bestTimesSolo: number[],
    bestTimesOnline: number[],
}

export enum POVType{Simple, Free};
