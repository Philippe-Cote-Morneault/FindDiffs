import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesCardViewService {

  public setBestTime(timeList: number[]): number[] {
    return timeList.sort((n1, n2) => n1 - n2).slice(0, 3);
  }



  constructor() { }
}
