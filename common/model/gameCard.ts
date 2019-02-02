import { CommonImagePair } from "./imagePair";

export interface CommonGameCard {
    guid: string,
    pov: string,
    title: string,
    images: CommonImagePair,
    bestTimesSolo: number[],
    bestTimesOnline: number[],
}

export const POVType: string[] =  ["Simple",  "Free"];
