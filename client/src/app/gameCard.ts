export class GameCard {
  constructor(
    public title: string,
    public image: string,
    public bestTimeSolo: number[],
    public bestTimeOnline: number[]) { }
}