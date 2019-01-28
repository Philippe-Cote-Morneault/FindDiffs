import { GameCardImages } from "./gameCardImages";
import { GameCardInfo } from "./gameCardInfo";

export class GameCard {
    public info: GameCardInfo;
    public images: GameCardImages;
    public bestTimesSolo: number[];
    public bestTimesOnline: number[];

    public constructor(info: GameCardInfo, images: GameCardImages, bestTimesSolo: number[], bestTimeOnline: number[]) {
        this.info = info;
        this.images = images;
        this.bestTimesSolo = bestTimesSolo;
        this.bestTimesOnline = bestTimeOnline;
    }
}

export enum POVType {Simple, Free}
