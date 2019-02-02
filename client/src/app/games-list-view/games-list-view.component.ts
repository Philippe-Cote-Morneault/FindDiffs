import { Component, OnInit } from "@angular/core";
import { GameCard, POVType } from "../../../../common/model/gameCard/gameCard";
import { GamesCardViewService } from "../gamesCard.service";
import { SocketService } from "../socket.service";

@Component({
  selector: "app-games-list-view",
  templateUrl: "./games-list-view.component.html",
  styleUrls: ["./games-list-view.component.css"],
})
export class GamesListViewComponent implements OnInit {
  public simplePOVgames: GameCard[];
  public freePOVgames: GameCard[];

  public constructor(public gameCardsService: GamesCardViewService, public socketService: SocketService) {
    this.gameCardsService.getGameCards(POVType.Simple).subscribe((cards: GameCard[]) => {
      this.simplePOVgames = cards;
    });

    this.gameCardsService.getGameCards(POVType.Free).subscribe((cards: GameCard[]) => {
      this.freePOVgames = cards;
    });

  }

  public ngOnInit(): void {
    this.socketService.onGameCardAdded().subscribe((card: GameCard) => this.addGameCard(card));
    this.socketService.onGameCardDeleted().subscribe((card: GameCard) => this.removeGameCard(card));
    this.socketService.onGameCardUpdate().subscribe((card: GameCard) => this.updateGameCard(card));
  }

  private addGameCard(gamecard: GameCard): void {
    gamecard.pov === POVType.Simple
    ? this.simplePOVgames.push(gamecard)
    : this.freePOVgames.push(gamecard);
  }

  private removeGameCard(gameCard: GameCard): void {
    const array: GameCard[] = gameCard.pov === POVType.Simple
    ? this.simplePOVgames
    : this.freePOVgames;

    for (let i: number = 0; i < array.length; --i) {
      if (array[i].guid === gameCard.guid) {
         array.splice(i, 1);
      }
    }
  }

  private updateGameCard(gameCard: GameCard): void {
    const array: GameCard[] = gameCard.pov === POVType.Simple
    ? this.simplePOVgames
    : this.freePOVgames;

    for (let i: number = 0; i < array.length; --i) {
      if (array[i].guid === gameCard.guid) {
         array[i] = gameCard;
      }
    }
  }

}
