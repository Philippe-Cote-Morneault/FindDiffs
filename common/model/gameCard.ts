import { CommonImagePair } from "./imagePair";

export interface CommonGameCard {
    guid: string,
    pov: POVType,
    title: string,
    images: CommonImagePair,
    bestTimesSolo: number[],
    bestTimesOnline: number[],
}

export enum POVType{Simple, Free};
