import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { GameCard, POVType } from "./gameCard";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GameCardsService {
  private http: HttpClient;
  private readonly BASE_URL: string = "http://localhost:3000/";

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public getGameCards(povType: POVType): Observable<GameCard[]> {
    const cardType: string = povType === POVType.Simple ? "simple" : "free";

    return this.http.get<GameCard[]>(this.BASE_URL + "gamecards/" + cardType + "POV").pipe(
      catchError(this.handleError<GameCard[]>("getGameCards")),
    );
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
