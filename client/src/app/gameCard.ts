import { v4 as uuid } from "uuid";

export class GameCard {
  public id: string;
  public title: string;
  public image: string;
  public bestTimeSolo: number[];
  public bestTimeOnline: number[];

  public constructor(id: string, title: string, image: string, bestTimeSolo: number[], bestTimeOnline: number[]) {
      this.id = id;
      this.title = title;
      this.image = image;
      this.bestTimeSolo = bestTimeSolo;
      this.bestTimeOnline = bestTimeOnline;
  }
}