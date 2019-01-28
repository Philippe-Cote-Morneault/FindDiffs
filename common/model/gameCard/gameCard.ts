export interface GameCard {
    id: string;
    pov: POVType;
    title: string;
    originalImage: string;
    modifiedImage: string;
    differencesImage: string;
    bestTimeSolo: number[];
    bestTimeOnline: number[];
}

export enum POVType {Simple, Free}
