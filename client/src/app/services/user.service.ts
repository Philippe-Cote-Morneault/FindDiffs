import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../../common/communication/message";
import { SERVER_URL } from "../../../../common/url";

@Injectable()
export class UserService {

    public constructor(private http: HttpClient) { }

    public postUsernameValidation<User>(username: string): Observable<User | Message> {
        return this.http.post<User>(`${SERVER_URL}/user/`, {username: username}).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public deleteUsername(userId: string): Observable<Message> {
        return this.http.delete<Message>(`${SERVER_URL}/user/${userId}`).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    private handleError(error: HttpErrorResponse): Observable<Message> {
        return of({
            title: "error",
            body: error.error.body,
        });
      }
}
