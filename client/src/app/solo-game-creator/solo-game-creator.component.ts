import { Component } from "@angular/core";
import { Bitmap } from "../../../../server/app/model/bitmap/bitmap";
import { SoloGameCreatorService } from "../solo-game-creator.service";

@Component({
  selector: "app-solo-game-creator",
  templateUrl: "./solo-game-creator.component.html",
  styleUrls: ["./solo-game-creator.component.css"],
})

const ORIGINAL_IMAGE_POSITION: number = 1;
const MODIFIED_IMAGE_POSITION: number = 2;

export class SoloGameCreatorComponent {

  public constructor(public soloGameCreatorService: SoloGameCreatorService) {}
  public validateNumberDifferences(): void {
    this.soloGameCreatorService.getVerifyNumberDifferences().subscribe();
  }
}
