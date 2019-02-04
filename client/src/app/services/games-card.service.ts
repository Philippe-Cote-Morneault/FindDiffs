import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../../common/communication/message";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { SERVER_URL } from "../../../../common/url";
import { Event, SocketService } from "./socket.service";

@Injectable({
    providedIn: "root",
})
export class GamesCardService {

    public constructor(private http: HttpClient, private socketService: SocketService) { }

    public getGameCards(): Observable<ICommonGameCard[] | Message> {
        return this.http.get<ICommonGameCard[]>(`${SERVER_URL}/gamecard/`).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public addGameCard(gameName: string, imagePairId: string, pov: POVType): Observable<ICommonGameCard | Message> {
        const requestBody: Object = { "name": gameName, "image-pair-id": imagePairId, "pov": "Simple" };

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

    private handleError(error: HttpErrorResponse): Observable<Message> {
        return of({
            title: "error",
            body: error.error.body,
        });
    }
}
