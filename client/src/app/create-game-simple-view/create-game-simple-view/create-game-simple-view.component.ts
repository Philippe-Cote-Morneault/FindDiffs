import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-game-simple-view",
  templateUrl: "./create-game-simple-view.component.html",
  styleUrls: ["./create-game-simple-view.component.css"],
})
export class CreateGameSimpleViewComponent implements OnInit {
  public title: string = "Create a simple point of view game";
  public submitButton: string = "Submit";
  public cancelButton: string = "Cancel";
  public gameName: string = "Name of the game :";

  public constructor() {}

  public ngOnInit(): void {}

}
