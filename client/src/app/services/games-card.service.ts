import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../../common/communication/message";
import { CommonGameCard, POVType } from "../../../../common/model/gameCard";
import { Event, SocketService } from "./socket.service";

/*
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
*/

@Injectable({
  providedIn: "root",
})
export class GamesCardViewService {

  public constructor(private http: HttpClient, private socketService: SocketService) { }

  private gamesUrl: string = "api/games";

  public getGameCards(povType: POVType): Observable<CommonGameCard[]> {
    return this.http.get<CommonGameCard[]>(this.gamesUrl)
      .pipe(
        catchError(this.handleError("getGameCards", [])),
      );
  }

  public onGameCardAdded(): Observable<CommonGameCard> {
    return new Observable<CommonGameCard>((observer) => {
        this.socketService.onEvent(Event.GAME_CARD_ADDED).subscribe((gameCard: Message) => {
          const card: CommonGameCard = JSON.parse(gameCard.body);
          observer.next(card);
        });
    });
  }

  public onGameCardDeleted(): Observable<CommonGameCard> {
    return new Observable<CommonGameCard>((observer) => {
        this.socketService.onEvent(Event.GAME_CARD_DELETED).subscribe((gameCard: Message) => {
          const card: CommonGameCard = JSON.parse(gameCard.body);
          observer.next(card);
      });
    });
  }

  public onGameCardUpdated(): Observable<CommonGameCard> {
    return new Observable<CommonGameCard>((observer) => {
        this.socketService.onEvent(Event.GAME_CARD_UPDATED).subscribe((gameCard: Message) => {
          const card: CommonGameCard = JSON.parse(gameCard.body);
          observer.next(card);
      });
    });
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
        return of(result as T);
    };
}

}
