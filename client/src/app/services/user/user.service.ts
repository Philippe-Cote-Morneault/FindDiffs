import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../../../common/communication/message";
import { SERVER_URL } from "../../../../../common/url";
import { HTTPService } from "../HTTP.service";

@Injectable()
export class UserService extends HTTPService {

    public constructor(private http: HttpClient) {
        super();
    }

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
}
