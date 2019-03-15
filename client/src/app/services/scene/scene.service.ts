import { HttpClient, HttpHeaders } from "@angular/common/http";
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
export class SceneService extends HTTPService {

    public constructor(private http: HttpClient) {
        super();
    }

    public createScene(objectType: string, objectQuantity: number): Observable<ICommonScene | Message> {
        const requestBody: Object = { "object_type": objectType, "object_qty": objectQuantity };

        return this.http.post<ICommonScene>(`${SERVER_URL}/scene/`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public createModifiedScene(sceneId: string, addObject: boolean, deleteObject: boolean, changeColorObject: boolean):
        Observable<ICommonSceneModifications | Message> {

        const requestBody: Object = { "add": addObject, "delete": deleteObject, "color": changeColorObject };

        return this.http.post<ICommonSceneModifications>(`${SERVER_URL}/scene/${sceneId}/modified`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public addThumbnail(sceneId: string, thumbnail: Blob): Observable<string> {
        const formData: FormData = new FormData();
        formData.append("thumbnail", thumbnail);

        const options: object = {
            headers: new HttpHeaders()
        };

        // @ts-ignore
        options["responseType"] = "text";

        return this.http.post<string>(`${SERVER_URL}/scene/${sceneId}/thumbnail`, formData, options);
    }

    public getSceneById(sceneId: string): Observable<ICommonScene | Message> {
        return this.http.get<ICommonScene>(`${SERVER_URL}/scene/${sceneId}`).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

    public getModifiedSceneById(sceneId: string): Observable<ICommonSceneModifications | Message> {
        return this.http.get<ICommonSceneModifications>(`${SERVER_URL}/scene/${sceneId}/modified`).pipe(
            catchError((error) => this.handleError(error)),
        );
    }

}
