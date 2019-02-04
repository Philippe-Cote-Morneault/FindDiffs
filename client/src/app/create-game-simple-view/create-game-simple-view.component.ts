import { Component, EventEmitter, Output } from "@angular/core";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { HTMLInputEvent } from "../htmlinput-event";
import { GamesCardService } from "../services/games-card.service";
import { ImagePairService } from "../services/image-pair.service";

@Component({
  selector: "app-create-game-simple-view",
  templateUrl: "./create-game-simple-view.component.html",
  styleUrls: ["./create-game-simple-view.component.css"],
})
export class CreateGameSimpleViewComponent {
  @Output() public closed: EventEmitter<boolean> = new EventEmitter();

  private gamesCardService: GamesCardService;
  private imagePairService: ImagePairService;

  public canSubmit: boolean = false;
  public informationsNewGame: number[] = [0, 0, 0];

  public mymodel: string = "";

  private originalImageFile: File;
  private modifiedImageFile: File;
  private gameName: string;

  public constructor(gamesCardService: GamesCardService, imagePairService: ImagePairService) {
    this.gamesCardService = gamesCardService;
    this.imagePairService = imagePairService;
  }

  public verifyName(): void {
    const MIN_LENGTH: number = 2;
    const MAX_LENGTH: number = 13;
    const gameName: string = (document.getElementById("validationServer03") as HTMLInputElement).value;
    gameName.length > MIN_LENGTH && gameName.length < MAX_LENGTH ? this.informationsNewGame[0] = 1 : this.informationsNewGame[0] = 0;
    this.gameName = gameName;
  }

  public fileEvent(event: HTMLInputEvent, positionFile: number): void {
    if (event.target.files != null) {
      const fileName: string = event.target.files[0].name;
      fileName.split(".")[1] === "bmp" ? this.informationsNewGame[positionFile] = 1 : this.informationsNewGame[positionFile] = 0;
      positionFile === 1 ? this.originalImageFile = event.target.files[0] : this.modifiedImageFile = event.target.files[0];
    }
  }

  public verifyInfo(): void {
    const allEqual: boolean = this.informationsNewGame.every((value) => value === 1);
    this.canSubmit = allEqual;
  }

  public addImagePair(): void {
    this.imagePairService.addImagePair(this.gameName, this.originalImageFile, this.modifiedImageFile)
      .subscribe((imagePair: ICommonImagePair) => {
        this.addGameCard(imagePair.id);
      });
  }

  private addGameCard(imagePairId: string): void {
    this.gamesCardService.addGameCard(this.gameName, imagePairId, POVType.Simple)
          .subscribe((gameCard: ICommonGameCard) => {
            window.location.reload();
          });
  }

  public hideView(): void {
    this.closed.emit(true);
  }
}
