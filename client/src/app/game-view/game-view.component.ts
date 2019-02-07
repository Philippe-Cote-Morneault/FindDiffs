import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { GamesCardService } from "../services/games-card.service";

@Component({
  selector: "app-game-view",
  templateUrl: "./game-view.component.html",
  styleUrls: ["./game-view.component.css"],
})
export class GameViewComponent implements OnInit {
  public gameCard: ICommonGameCard;
  private gamesCardService: GamesCardService;

  private id: string;

  public constructor(gamesCardService: GamesCardService, private route: ActivatedRoute) {
    this.gamesCardService = gamesCardService;
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
    });

    this.getGameById();
  }

  private getGameById(): void {
    this.gamesCardService.getGameById(this.id).subscribe((gameCard: ICommonGameCard) => {
      this.gameCard = gameCard;
    });
  }

}
