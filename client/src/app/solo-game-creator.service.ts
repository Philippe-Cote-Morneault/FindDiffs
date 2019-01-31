import { Injectable } from "@angular/core";

@Injectable()
export class SoloGameCreatorService {

  // private readonly BASE_URL: string = "http://localhost:3000/user/";
  // private readonly SOLO_GAME_GENERATOR_URL: string = "differences/";
  private NUMBER_DIFFERENCES: number = 7;
  public constructor() { }

  public getVerifyNumberDifferences(): void {
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
