import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICommonGameCard, ICommonScoreEntry } from "../../../../common/model/gameCard";
import { GamesCardService } from "../services/gameCard/gamesCard.service";
import { StringFormater } from "../util/stringFormater";

@Component({
  selector: "app-end-multiplayer-game",
  templateUrl: "./end-multiplayer-game.component.html",
  styleUrls: ["./end-multiplayer-game.component.css"],
})
export class EndMultiplayerGameComponent implements OnInit {

  @ViewChild("tryAgain") private tryAgain: ElementRef;

  @Input() public gameCard: ICommonGameCard;
  @Input() public playerTimeChild: string;
  @Input() public winner: string;

  public endingMessage: string;
  public gameCardId: string;
  private waitingScreenPath: string;

  public constructor(
    private route: ActivatedRoute,
    public gamesCardService: GamesCardService,
    private router: Router) {
    this.waitingScreenPath = "/gamesList";
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameCardId = params["id"];
    });
    this.getGameCardById();
    this.verifyWinCondition();
  }

  private getGameCardById(): void {
    this.gamesCardService.getGameById(this.gameCardId).subscribe((gameCard: ICommonGameCard) => {
      this.gameCard = gameCard;
    });
  }

  public toMinutes(index: number, times: ICommonScoreEntry[]): string {
    return StringFormater.secondsToMinutes(times[index].score);
  }

  private verifyWinCondition(): void {
    if (sessionStorage.getItem("user") === this.winner) {
      this.endingMessage = "You won!";
      this.tryAgain.nativeElement.style.display = "none";
    } else {
      this.endingMessage = "You lost!";
    }
  }

  public async leaveGame(): Promise<void> {
    await this.router.navigateByUrl("/gamesList");
  }

  public async resetGame(): Promise<void> {
    await this.router.navigateByUrl(this.waitingScreenPath);
  }
}
