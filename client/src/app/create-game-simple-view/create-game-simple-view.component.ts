import { Component } from "@angular/core";
import { HTMLInputEvent } from "../htmlinput-event";

@Component({
  selector: "app-create-game-simple-view",
  templateUrl: "./create-game-simple-view.component.html",
  styleUrls: ["./create-game-simple-view.component.css"],
})
export class CreateGameSimpleViewComponent {

  public canSubmit: boolean = false;
  public informationsNewGame: number[] = [0, 0, 0];
  public mymodel: string = "";

  public title: string = "Create a simple point of view game";
  public submitButton: string = "Submit";
  public cancelButton: string = "Cancel";
  public gameName: string = "Name of the game :";

  public verifyName(): void {
    const MIN_LENGTH: number = 2;
    const MAX_LENGTH: number = 13;
    const gameName: string = (document.getElementById("validationServer03") as HTMLInputElement).value;
    gameName.length > MIN_LENGTH && gameName.length < MAX_LENGTH ? this.informationsNewGame[0] = 1 : this.informationsNewGame[0] = 0;
  }

  public fileEvent(event: HTMLInputEvent, positionFile: number): void {
    if (event.target.files != null) {
      const fileName: string = event.target.files[0].name;
      fileName.split(".")[1] === "png" ? this.informationsNewGame[positionFile] = 1 : this.informationsNewGame[positionFile] = 0;
    }
  }
  public verifyInfo(): void {
    const allEqual: boolean = this.informationsNewGame.every((value) => value === 1);
    this.canSubmit = allEqual;
  }

  public hideView(): void {
    (document.getElementById("simpleViewId") as HTMLInputElement).style.display = "none";
  }
}
// https://www.bootply.com/oFPl81lzM6