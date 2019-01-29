import { ImagePair } from "../../communication/imagePair";

export interface GameCard {
    id: string,
    pov: POVType,
    title: string,
    images: ImagePair,
    bestTimesSolo: number[],
    bestTimesOnline: number[],
}

export enum POVType {Simple, Free}
