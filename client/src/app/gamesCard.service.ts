import { Injectable } from "@angular/core";
import { GameCard } from "../../../common/model/gameCard/gameCard";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { POVType } from "../../../common/model/gameCard/gameCard";
import { SocketService, Event } from "./socket.service";
import { Message } from "../../../common/communication/message";

/*
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
*/

@Injectable({
  providedIn: 'root'
})
export class GamesCardViewService {

  public constructor(private http: HttpClient, private socketService: SocketService) { }

  private gamesUrl: string = "api/games";

  public getGameCards(povType: POVType): Observable<GameCard[]> {
    return this.http.get<GameCard[]>(this.gamesUrl)
      .pipe(
        catchError(this.handleError("getGameCards", [])),
      );
  }

  public onGameCardAdded(): Observable<GameCard> {
    return new Observable<GameCard>((observer) => {
        this.socketService.onEvent(Event.GAME_CARD_ADDED).subscribe((gameCard: Message) => {
          const card: GameCard = JSON.parse(gameCard.body);
          observer.next(card);
        });
    });
  }

  public onGameCardDeleted(): Observable<GameCard> {
    return new Observable<GameCard>((observer) => {
        this.socketService.onEvent(Event.GAME_CARD_DELETED).subscribe((gameCard: Message) => {
          const card: GameCard = JSON.parse(gameCard.body);
          observer.next(card);
      });
    });
  }

  public onGameCardUpdated(): Observable<GameCard> {
    return new Observable<GameCard>((observer) => {
        this.socketService.onEvent(Event.GAME_CARD_UPDATED).subscribe((gameCard: Message) => {
          const card: GameCard = JSON.parse(gameCard.body);
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
