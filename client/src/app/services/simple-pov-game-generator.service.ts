import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { POVType, ICommonGameCard } from "../../../../common/model/gameCard";

@Injectable({
  providedIn: "root",
})
export class SimplePovGameGeneratorService {
  private readonly BASE_URL: string = "http://localhost:3000/";

  public constructor(private http: HttpClient) { }

  public addImagePair(gameName: string, originalImage: File, modifiedImage: File): Observable<ICommonImagePair> {
    const formData: FormData = new FormData();
    formData.append("name", gameName);
    formData.append("originalImage", originalImage);
    formData.append("modifiedImage", modifiedImage);

    return this.http.post<ICommonImagePair>(this.BASE_URL + "image-pair/", formData);
  }

  public addGameCard(gameName: string, imagePairId: string, pov: POVType): Observable<ICommonGameCard> {
    const formData: FormData = new FormData();
    formData.append("name", gameName);
    formData.append("image-pair-id", imagePairId);
    formData.append("pov", "Simple");

    new Response(formData).text().then(console.log);
    return this.http.post<ICommonGameCard>(this.BASE_URL + "gamecard/", formData);
  }
}
