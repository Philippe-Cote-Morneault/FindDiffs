import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
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
    // TODO: What does it return? (replace any)
    public addScenePair(gameName: string, objectType: string,
                        quantity: number, isAddModif: boolean,
                        isRemoveModif: boolean, isModifiedModif: boolean): Observable<any> {

        const requestBody: Object = {"name": gameName, "object_type": objectType,
                                     "object_qty": quantity, "add": isAddModif,
                                     "remove": isRemoveModif, "modified": isModifiedModif };

        return this.http.post<any>(`${SERVER_URL}/scene/`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }
}
