import { POVType } from "./gameCard";

export class GameCardInfo {
    public id: string;
    public pov: POVType;
    public title: string;

    public constructor(id: string, pov: POVType, title: string) {
        this.id = id;
        this.pov = pov;
        this.title = title;
    }
}