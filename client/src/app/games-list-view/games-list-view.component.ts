import { Component, OnInit } from "@angular/core";
import { CommonGameCard, POVType } from "../../../../common/model/gameCard";
import { GamesCardViewService } from "../services/gamesCard.service";
import { SocketService } from "../services/socket.service";

@Component({
  selector: "app-games-list-view",
  templateUrl: "./games-list-view.component.html",
  styleUrls: ["./games-list-view.component.css"],
})
export class GamesListViewComponent implements OnInit {
  public simplePOVgames: CommonGameCard[];
  public freePOVgames: CommonGameCard[];

  public constructor(public gameCardsService: GamesCardViewService, public socketService: SocketService) {
    this.gameCardsService.getGameCards(POVType.Simple).subscribe((cards: CommonGameCard[]) => {
      this.simplePOVgames = cards;
    });

    this.gameCardsService.getGameCards(POVType.Free).subscribe((cards: CommonGameCard[]) => {
      this.freePOVgames = cards;
    });

  }

  public ngOnInit(): void {
    this.gameCardsService.onGameCardAdded().subscribe((card: CommonGameCard) => this.addGameCard(card));
    this.gameCardsService.onGameCardDeleted().subscribe((card: CommonGameCard) => this.removeGameCard(card));
    this.gameCardsService.onGameCardUpdated().subscribe((card: CommonGameCard) => this.updateGameCard(card));
  }

  private addGameCard(gamecard: CommonGameCard): void {
    gamecard.pov === POVType.Simple
    ? this.simplePOVgames.push(gamecard)
    : this.freePOVgames.push(gamecard);
  }

  private removeGameCard(gameCard: CommonGameCard): void {
    const array: CommonGameCard[] = gameCard.pov === POVType.Simple
    ? this.simplePOVgames
    : this.freePOVgames;

    for (let i: number = 0; i < array.length; --i) {
      if (array[i].guid === gameCard.guid) {
         array.splice(i, 1);
      }
    }
  }

  private updateGameCard(gameCard: CommonGameCard): void {
    const array: CommonGameCard[] = gameCard.pov === POVType.Simple
    ? this.simplePOVgames
    : this.freePOVgames;

    for (let i: number = 0; i < array.length; --i) {
      if (array[i].guid === gameCard.guid) {
         array[i] = gameCard;
      }
    }
  }

}
