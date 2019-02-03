import { Component } from "@angular/core";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { AdminViewComponent } from "../admin-view/admin-view.component";
import { HTMLInputEvent } from "../htmlinput-event";
import { SimplePovGameGeneratorService } from "../services/simple-pov-game-generator.service";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { POVType, ICommonGameCard } from "../../../../common/model/gameCard";

@Component({
  selector: "app-create-game-simple-view",
  templateUrl: "./create-game-simple-view.component.html",
  styleUrls: ["./create-game-simple-view.component.css"],
})
export class CreateGameSimpleViewComponent {
  private simplePOVGameGeneratorService: SimplePovGameGeneratorService;

  public canSubmit: boolean = false;
  public informationsNewGame: number[] = [0, 0, 0];
  public mymodel: string = "";

  public title: string = "Create a simple point of view game";
  public submitButton: string = "Submit";
  public cancelButton: string = "Cancel";
  public nameOfGame: string = "Name of the game :";

  private originalImageFile: File;
  private modifiedImageFile: File;
  private gameName: string;

  public constructor(simplePOVGameGeneratorService: SimplePovGameGeneratorService, private adminViewComponent: AdminViewComponent ) {
    this.simplePOVGameGeneratorService = simplePOVGameGeneratorService;
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
    this.simplePOVGameGeneratorService.addImagePair(this.gameName, this.originalImageFile, this.modifiedImageFile)
      .subscribe((imagePair: ICommonImagePair) => {
        this.simplePOVGameGeneratorService.addGameCard(imagePair.name, imagePair.id, POVType.Simple)
      });
  }

  private addGameCard(imagePairId: string): void {
    this.simplePOVGameGeneratorService.addGameCard(this.gameName, imagePairId, POVType.Simple)
          .subscribe((gameCard: ICommonGameCard) => {
            console.log(gameCard);
            window.location.reload();
          });
      });
    (document.getElementById("simpleViewId") as HTMLInputElement).style.display = "none";
    this.adminViewComponent.isPopUpVisible = false;
  }

  public hideView(): void {
    (document.getElementById("simpleViewId") as HTMLInputElement).style.display = "none";
    this.adminViewComponent.isPopUpVisible = false;
  }
}
