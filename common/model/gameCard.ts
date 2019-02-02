import { ICommonImagePair } from "./imagePair";

export interface ICommonGameCard {
    id: string,
    pov: POVType,
    title: string,
    images: ICommonImagePair,
    bestTimesSolo: number[],
    bestTimesOnline: number[],
}

export enum POVType{Simple, Free};
