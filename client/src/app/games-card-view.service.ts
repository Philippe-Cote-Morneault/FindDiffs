import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesCardViewService {

  public getBestTime(timeList: number[]): number[] {
    return timeList.sort((n1, n2) => n1 - n2).slice(0, 3);
  }

  constructor() { }
}
