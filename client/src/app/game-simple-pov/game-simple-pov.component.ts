import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game-simple-pov",
  templateUrl: "./game-simple-pov.component.html",
  styleUrls: ["./game-simple-pov.component.css"],
})
export class GameSimplePovComponent implements OnInit {
  private originalCanvasID: string;
  private modifiedCanvasID: string;
  private canvas: HTMLCanvasElement;

  public constructor() {
    this.originalCanvasID = "original_canvas";
    this.modifiedCanvasID = "modified_canvas";
   }

  public ngOnInit(): void { }

}
