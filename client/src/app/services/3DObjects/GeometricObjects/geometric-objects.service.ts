import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
// import { ICommonReveal3D } from "../../../../../../common/model/reveal";
import { SERVER_URL } from "../../../../../../common/url";
import { HTTPService } from "../../HTTP.service";

@Injectable({
    providedIn: "root",
})
export class GeometricObjectsService extends HTTPService {

    public constructor(private http: HttpClient) {
        super();
    }

    // tslint:disable:no-any
    public post3DObject(originalSceneId: string, modifiedObjectId: string, originalObjectId: string): Observable<any> {
        const requestBody: Object = {
            "originalSceneId": originalSceneId,
            "modifiedObjectId": modifiedObjectId,
            "originalObjectId": originalObjectId};

        return this.http.post<any>(`${SERVER_URL}/difference/free`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }
}
