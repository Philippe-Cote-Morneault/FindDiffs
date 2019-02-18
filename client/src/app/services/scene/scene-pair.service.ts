import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../../../common/communication/message";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { SERVER_URL } from "../../../../../common/url";
import { HTTPService } from "../HTTP.service";

@Injectable({
    providedIn: "root",
})
export class ScenePairService extends HTTPService {
    private http: HttpClient;

    public constructor(http: HttpClient) {
        super();
        this.http = http;
    }

    public addScenePair(objectType: string, quantity: number): Observable<ICommonScene | Message> {

        const requestBody: Object = {"object_type": objectType, "object_qty": quantity};

        return this.http.post<ICommonScene>(`${SERVER_URL}/scene/`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public modifyScenePair(id: string, add: boolean, remove: boolean, color: boolean): Observable<ICommonSceneModifications | Message> {
        const requestBody: Object = {"id": id, "add": add, "remove": remove, "color": color};

        return this.http.post<ICommonSceneModifications>(`${SERVER_URL}/scene/${id}/modified`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }
}
