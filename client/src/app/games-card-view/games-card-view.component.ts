import { Component, Input } from "@angular/core";
import { GameCard } from "../../../../common/model/gameCard/gameCard";

@Component({
  selector: "app-games-card-view",
  templateUrl: "./games-card-view.component.html",
  styleUrls: ["./games-card-view.component.css"],
})
export class GamesCardViewComponent {
  @Input() public gameCard: GameCard;
  public buttonSolo: string = "Solo";
  public buttonOnline: string = "1 vs. 1";
}
