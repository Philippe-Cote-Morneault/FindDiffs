import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../../common/communication/message";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { SERVER_URL } from "../../../../common/url";
import { HTTPService } from "./HTTP.service";

@Injectable({
    providedIn: "root",
})
export class ScenePairService extends HTTPService {
    private http: HttpClient;

    public constructor(http: HttpClient) {
        super();
        this.http = http;
    }

    public addScenePair(gameName: string, objectType: string,
                        quantity: number, isAddModif: boolean,
                        isRemoveModif: boolean, isModifiedModif: boolean): Observable<ICommonScene | Message> {

        const requestBody: Object = {"name": gameName, "object_type": objectType,
                                     "object_qty": quantity, "add": isAddModif,
                                     "remove": isRemoveModif, "modified": isModifiedModif };

        return this.http.post<ICommonScene>(`${SERVER_URL}/scene/`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }
}
