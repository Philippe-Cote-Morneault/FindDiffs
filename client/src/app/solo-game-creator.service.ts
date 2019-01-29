import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { Message } from "../../../common/communication/message";

@Injectable()
export class SoloGameCreatorService {

  private readonly BASE_URL: string = "http://localhost:3000/user/";
  private readonly SOLO_GAME_GENERATOR_URL: string = "differences/";
  private const NUMBER_DIFFERENCES = 7;
  public constructor() { }

  public getVerifyNumberDifferences(): Observable<Message> {
    /*
    POST: /image-pair
    body:
    {
      "name": ,
      "originalImage": ,
      "modifiedImage":
    }
    */
  }

  public verifyNumberDifferences(nbDifferences: number): boolean {
    return nbDifferences === this.NUMBER_DIFFERENCES;
  }
}
