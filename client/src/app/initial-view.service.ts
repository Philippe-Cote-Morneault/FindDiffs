import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../common/communication/message";

@Injectable()
export class InitialViewService {

    private readonly BASE_URL: string = "http://localhost:3000/user/";
    public constructor(private http: HttpClient) { }

    public postUsernameValidation<User>(username: string): Observable<User> {
        return this.http.post<User>(this.BASE_URL, {username: username}).pipe(
            catchError(this.handleError<User>("postUsernameValidation")),
        );
    }

    public deleteUsername(userId: string): Observable<Message> {
        return this.http.delete<Message>(this.BASE_URL + userId).pipe(
            catchError(this.handleError<Message>("deleteUsername")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {

            return of(result as T);
        };
    }
}
