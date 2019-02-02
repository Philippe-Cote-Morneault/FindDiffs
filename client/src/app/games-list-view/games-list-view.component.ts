import { Component, OnInit } from "@angular/core";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { GamesCardViewService } from "../services/games-card.service";
import { SocketService } from "../services/socket.service";

@Component({
  selector: "app-games-list-view",
  templateUrl: "./games-list-view.component.html",
  styleUrls: ["./games-list-view.component.css"],
})
export class GamesListViewComponent implements OnInit {
  public simplePOVgames: ICommonGameCard[];
  public freePOVgames: ICommonGameCard[];

  public constructor(public gameCardsService: GamesCardViewService, public socketService: SocketService) {
    this.gameCardsService.getGameCards(POVType.Simple).subscribe((cards: ICommonGameCard[]) => {
      this.simplePOVgames = cards;
    });

    this.gameCardsService.getGameCards(POVType.Free).subscribe((cards: ICommonGameCard[]) => {
      this.freePOVgames = cards;
    });

  }

  public ngOnInit(): void {
    this.gameCardsService.onGameCardAdded().subscribe((card: ICommonGameCard) => this.addGameCard(card));
    this.gameCardsService.onGameCardDeleted().subscribe((card: ICommonGameCard) => this.removeGameCard(card));
    this.gameCardsService.onGameCardUpdated().subscribe((card: ICommonGameCard) => this.updateGameCard(card));
  }

  private addGameCard(gamecard: ICommonGameCard): void {
    gamecard.pov === POVType.Simple
    ? this.simplePOVgames.push(gamecard)
    : this.freePOVgames.push(gamecard);
  }

  private removeGameCard(gameCard: ICommonGameCard): void {
    const array: ICommonGameCard[] = gameCard.pov === POVType.Simple
    ? this.simplePOVgames
    : this.freePOVgames;

    for (let i: number = 0; i < array.length; --i) {
      if (array[i].id === gameCard.id) {
         array.splice(i, 1);
      }
    }
  }

  private updateGameCard(gameCard: ICommonGameCard): void {
    const array: ICommonGameCard[] = gameCard.pov === POVType.Simple
    ? this.simplePOVgames
    : this.freePOVgames;

    for (let i: number = 0; i < array.length; --i) {
      if (array[i].id === gameCard.id) {
         array[i] = gameCard;
      }
    }
  }

}
