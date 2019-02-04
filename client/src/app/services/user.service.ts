import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../../common/communication/message";

@Injectable()
export class UserService {

    private readonly BASE_URL: string = "http://localhost:3000/user/";
    public constructor(private http: HttpClient) { }

    public postUsernameValidation<User>(username: string): Observable<User | Message> {
        return this.http.post<User>(this.BASE_URL, {username: username}).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public deleteUsername(userId: string): Observable<Message> {
        return this.http.delete<Message>(this.BASE_URL + userId).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public handleError(error: HttpErrorResponse): Observable<Message> {

        return of({
            title: "Error",
            body: error.error.body,
        });
      }
}
