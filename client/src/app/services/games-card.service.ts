import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Message } from "../../../../common/communication/message";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { Event, SocketService } from "./socket.service";

@Injectable({
  providedIn: "root",
})
export class GamesCardService {
  private readonly BASE_URL: string = "http://localhost:3000/";
  private readonly GAMECARD_URL: string = "gamecard/";

  public constructor(private http: HttpClient, private socketService: SocketService) { }

  public getGameCards(): Observable<ICommonGameCard[]> {
    return this.http.get<ICommonGameCard[]>(this.BASE_URL + this.GAMECARD_URL).pipe(
      map((res) => res),
    );
  }

  public addGameCard(gameName: string, imagePairId: string, pov: POVType): Observable<ICommonGameCard> {
    const requestBody: Object = { "name": gameName, "image-pair-id": imagePairId, "pov": "Simple"};

    return this.http.post<ICommonGameCard>(this.BASE_URL + "gamecard", requestBody);
  }

  public deleteGameCard(gameCardId: string): Observable<Message> {
    return this.http.delete<Message>(this.BASE_URL + this.GAMECARD_URL + gameCardId).pipe(
      catchError(this.handleError<Message>("deleteGameCard")),
    );
  }

  public resetBestTimes(gameCard: ICommonGameCard): Observable<Message> {

    const requestBody: Object = { "best_time_solo": gameCard.best_time_solo.toString(),
                                  "best_time_online": gameCard.best_time_online.toString()};

    return this.http.put<Message>(this.BASE_URL + this.GAMECARD_URL + gameCard.id, requestBody).pipe(
      catchError(this.handleError<Message>("resetBestTimes")),
    );
  }

  public onGameCardAdded(): Observable<ICommonGameCard> {
    return new Observable<ICommonGameCard>((observer) => {
        this.socketService.onEvent(Event.GAME_CARD_ADDED).subscribe((gameCard: Message) => {
          const card: ICommonGameCard = JSON.parse(gameCard.body);
          observer.next(card);
        });
    });
  }

  public onGameCardDeleted(): Observable<ICommonGameCard> {
    return new Observable<ICommonGameCard>((observer) => {
        this.socketService.onEvent(Event.GAME_CARD_DELETED).subscribe((gameCard: Message) => {
          const card: ICommonGameCard = JSON.parse(gameCard.body);
          observer.next(card);
      });
    });
  }

  public onGameCardUpdated(): Observable<ICommonGameCard> {
    return new Observable<ICommonGameCard>((observer) => {
        this.socketService.onEvent(Event.GAME_CARD_UPDATED).subscribe((gameCard: Message) => {
          const card: ICommonGameCard = JSON.parse(gameCard.body);
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
