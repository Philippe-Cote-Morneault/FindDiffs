import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImagePairService {
  private readonly BASE_URL: string = "http://localhost:3000/image-pair/";


  private http: HttpClient;


  public constructor(http: HttpClient) {
    this.http = http;
  }

  public getOriginalImage(id: string): Observable<File> {
    return this.http.get<File>(this.BASE_URL + id + "/original");
  }
}