import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../../../common/communication/message";
import { ICommonGameCard, POVType } from "../../../../../common/model/gameCard";
import { SERVER_URL } from "../../../../../common/url";
import { HTTPService } from "../HTTP.service";

@Injectable({
    providedIn: "root",
})
export class GamesCardService extends HTTPService {

    public constructor(private http: HttpClient) {
        super();
    }

    public getGameCards(): Observable<ICommonGameCard[] | Message> {
        return this.http.get<ICommonGameCard[]>(`${SERVER_URL}/gamecard/`).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public getGameById(gameCardId: string): Observable<ICommonGameCard | Message> {
        return this.http.get<ICommonGameCard>(`${SERVER_URL}/gamecard/${gameCardId}`).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    //TODO: remove "" of pov and resolve bug
    public addGameCard(gameName: string, imagePairId: string, pov: POVType): Observable<ICommonGameCard | Message> {
        const requestBody: Object = { "name": gameName, "resource_id": imagePairId, "pov": "Simple" };

        return this.http.post<ICommonGameCard>(`${SERVER_URL}/gamecard/`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public deleteGameCard(gameCardId: string): Observable<Message> {
        return this.http.delete<Message>(`${SERVER_URL}/gamecard/${gameCardId}`).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public resetBestTimes(gameCard: ICommonGameCard): Observable<Message> {
        const requestBody: Object = {
            "best_time_solo": gameCard.best_time_solo.toString(),
            "best_time_online": gameCard.best_time_online.toString(),
        };

        return this.http.put<Message>(`${SERVER_URL}/gamecard/${gameCard.id}`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }
}
