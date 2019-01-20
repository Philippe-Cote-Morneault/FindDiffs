import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message } from "../../../common/communication/message";
import { Observable, of } from "rxjs";

@Injectable()
export class InitialViewService {

    private readonly BASE_URL: string = "http://localhost:3000/verifyUser/";
    public constructor(private http: HttpClient) { }

    public getUsernameValidation(username: string): Observable<Message> {
        return this.http.get<Message>(this.BASE_URL + username).pipe(
            catchError(this.handleError<Message>("getUsernameValidation")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
