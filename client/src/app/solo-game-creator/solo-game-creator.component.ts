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
  public generateRandomBestTime(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1) + 1);
  }

  public generateBestTimeTable(min: number, max: number): number[] {
    const timeTable: number[] = [];

    let currentBestTime: number = this.generateRandomBestTime(min, max);
    timeTable.push(currentBestTime);

    currentBestTime = this.generateRandomBestTime(min, currentBestTime);
    timeTable.push(currentBestTime);

    currentBestTime = this.generateRandomBestTime(min, currentBestTime);
    timeTable.push(currentBestTime);

    return timeTable;
  }
}
