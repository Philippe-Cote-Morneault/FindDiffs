export interface GameCard {
    pov: POVType;
    title: string;
    image: string;
    bestTimeSolo: number[];
    bestTimeOnline: number[];
}

export enum POVType {Simple, Free}
