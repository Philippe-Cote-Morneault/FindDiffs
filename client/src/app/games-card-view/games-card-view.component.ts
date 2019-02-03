import { Component, Input, OnInit } from "@angular/core";
import { ICommonGameCard } from "../../../../common/model/gameCard";

@Component({
  selector: "app-games-card-view",
  templateUrl: "./games-card-view.component.html",
  styleUrls: ["./games-card-view.component.css"],
})
export class GamesCardViewComponent implements OnInit {
  @Input() public gameCard: ICommonGameCard;
  @Input() public isInAdminView: boolean = false;

  // TODO: Find a better name for these variables
  public leftButton: string = "Play";
  public rightButton: string = "Create";

  public ngOnInit(): void {
    if (this.isInAdminView) {
      this.leftButton = "Delete";
      this.rightButton = "Reset";
    }
  }
}
