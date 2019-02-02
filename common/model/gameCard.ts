import { ICommonImagePair } from "./imagePair";

export interface ICommonGameCard {
    id: string;
    pov: POVType;
    title: string;
    image_pair?: ICommonImagePair;
    best_time_solo: number[];
    best_time_online: number[];
}

export enum POVType{Simple, Free};
