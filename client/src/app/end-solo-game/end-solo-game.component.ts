import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ICommonGameCard, ICommonScoreEntry } from "../../../../common/model/gameCard";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { StringFormater } from "../util/stringFormater";

@Component({
  selector: "app-end-solo-game",
  templateUrl: "./end-solo-game.component.html",
  styleUrls: ["./end-solo-game.component.css"],
})
export class EndSoloGameComponent implements OnInit {

  public gameCard: ICommonGameCard;
  public gameCardId: string;
  public constructor(
    private route: ActivatedRoute,
    public gamesCardService: GamesCardService,
    private router: Router) { }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameCardId = params["id"];
    });
    this.getGameCardById();
  }

  private getGameCardById(): void {
    this.gamesCardService.getGameById(this.gameCardId).subscribe((gameCard: ICommonGameCard) => {
      this.gameCard = gameCard;
    });
  }

  public toMinutes(index: number, times: ICommonScoreEntry[]): string {
    return StringFormater.secondsToMinutes(times[index].score);
  }

  public async leaveGame(): Promise<void> {
    await this.router.navigateByUrl("/gamesList");
  }
}
