import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../common/communication/message";

@Injectable()
export class SoloGameCreatorService {

  private readonly BASE_URL: string = "http://localhost:3000/user/";
  private readonly SOLO_GAME_GENERATOR_URL: string = "differences/";
  constructor(private http: HttpClient) { }

  public getVerifyNumberDifferences(): Observable<Message> {
      return this.http.post
  }
}
