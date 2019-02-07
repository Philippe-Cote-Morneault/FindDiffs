import { Component, Input, OnInit } from "@angular/core";
import { ICommonGameCard } from "../../../../common/model/gameCard";

@Component({
  selector: "app-game-view",
  templateUrl: "./game-view.component.html",
  styleUrls: ["./game-view.component.css"],
})
export class GameViewComponent implements OnInit {
  @Input() public gameCard: ICommonGameCard;
  constructor() { }

  ngOnInit() {
  }

}
