import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../common/communication/message";

@Injectable()
export class InitialViewService {

    private readonly BASE_URL: string = "http://localhost:3000/user/";
    private readonly DELETE_URL: string = "disconnect/";
    public constructor(private http: HttpClient) { }

    public getUsernameValidation(username: string): Observable<Message> {
        return this.http.get<Message>(this.BASE_URL + username).pipe(
            catchError(this.handleError<Message>("getUsernameValidation")),
        );
    }

    public getDeleteUsername(username: string): Observable<Message> {
        return this.http.get<Message>(this.BASE_URL + this.DELETE_URL + username).pipe(
            catchError(this.handleError<Message>("getDeleteUsername")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
