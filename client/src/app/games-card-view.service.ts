import { Injectable } from "@angular/core";
import { gameCard } from './gameCard';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GamesCardViewService {

  constructor(private http: HttpClient) { }

  private gamesUrl = 'api/games';

  getGameCards() : Observable<GameCard[]> {
    return this.http.get<GameCard[]>(this.gamesUrl)
      .pipe(
        //tap(_=> this.log("fetched games"))
        catchError(this.handleError('getGames',[]))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


}
