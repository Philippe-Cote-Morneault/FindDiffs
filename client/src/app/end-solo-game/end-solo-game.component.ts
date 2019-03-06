import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-end-solo-game",
  templateUrl: "./end-solo-game.component.html",
  styleUrls: ["./end-solo-game.component.css"]
})
export class EndSoloGameComponent implements OnInit {

  public constructor() { }

  public ngOnInit(): void { }

  public test(): void {
    // tslint:disable:no-any
    const popup: any = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
}
