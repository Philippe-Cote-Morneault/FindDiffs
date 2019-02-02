import { ImagePair } from "../../communication/imagePair";

export interface GameCard {
    guid: string,
    pov: POVType,
    title: string,
    images: ImagePair,
    bestTimesSolo: number[],
    bestTimesOnline: number[],
}

export enum POVType  {Simple = "Simple", Free = "Free"};
