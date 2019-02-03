import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICommonImagePair } from "../../../../common/model/imagePair";

@Injectable({
  providedIn: "root",
})
export class ImagePairService {
  private readonly BASE_URL: string = "http://localhost:3000/image-pair/";

  private http: HttpClient;

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public addImagePair(gameName: string, originalImage: File, modifiedImage: File): Observable<ICommonImagePair> {
    const formData: FormData = new FormData();
    formData.append("name", gameName);
    formData.append("originalImage", originalImage);
    formData.append("modifiedImage", modifiedImage);

    return this.http.post<ICommonImagePair>(this.BASE_URL, formData);
  }
}
