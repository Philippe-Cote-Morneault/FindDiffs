import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { SERVER_URL } from "../../../../../common/url";
import { HTTPService } from "../HTTP.service";

@Injectable({
    providedIn: "root",
})
export class PixelPositionService extends HTTPService {

    public constructor(private http: HttpClient) {
        super();
    }

    // tslint:disable-next-line:no-any
    public postPixelPosition<Pixel>(imagePairId: string, x: number, y: number): Observable<any> {
        const requestBody: Object = { "image_pair_id": imagePairId, "x": x, "y": y};

        return this.http.post<Pixel>(`${SERVER_URL}/difference/simple`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }
}
