import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../../common/communication/message";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { SERVER_URL } from "../../../../common/url";

@Injectable({
    providedIn: "root",
})
export class ImagePairService {
    private http: HttpClient;

    public constructor(http: HttpClient) {
        this.http = http;
    }

    public addImagePair(gameName: string, originalImage: File, modifiedImage: File): Observable<ICommonImagePair | Message> {
        const formData: FormData = new FormData();
        formData.append("name", gameName);
        formData.append("originalImage", originalImage);
        formData.append("modifiedImage", modifiedImage);

        return this.http.post<ICommonImagePair>(`${SERVER_URL}/image-pair/`, formData).pipe(
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
