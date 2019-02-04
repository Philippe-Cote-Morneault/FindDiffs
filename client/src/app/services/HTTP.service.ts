import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable,  } from "rxjs";
import { Message } from "../../../../common/communication/message";

@Injectable({
    providedIn: "root",
})
export class HTTPService {

    public handleError(error: HttpErrorResponse): Observable<Message> {

        return of({
            title: "Error",
            body: error.error.body,
        });
    }
}
