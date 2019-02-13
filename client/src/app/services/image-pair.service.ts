import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../../common/communication/message";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { SERVER_URL } from "../../../../common/url";
import { HTTPService } from "./HTTP.service";

@Injectable({
    providedIn: "root",
})
export class ImagePairService extends HTTPService {
    private http: HttpClient;

    public constructor(http: HttpClient) {
        super();
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

    public getImagePairById(gameCardRessourceId: string): Observable<ICommonImagePair | Message> {
        return this.http.get<ICommonImagePair>(`${SERVER_URL}/image-pair/${gameCardRessourceId}`).pipe(
            catchError((error) => this.handleError(error)),
        );
    }
}
