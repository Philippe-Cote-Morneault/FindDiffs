import { ImagePair } from "../../communication/imagePair";

export interface GameCard {
    guid: string,
    pov: string,
    title: string,
    images: ImagePair,
    bestTimesSolo: number[],
    bestTimesOnline: number[],
}

export const POVType: String[] =  ["Simple",  "Free"];
