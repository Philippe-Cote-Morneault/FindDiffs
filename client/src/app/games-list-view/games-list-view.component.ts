import { Component, OnInit } from "@angular/core";
import { GameCard, POVType } from "../../../../common/communication/gameCard";
import { GameCardsService } from "../game-cards.service";
import { SocketService } from "../socket.service";

@Component({
  selector: "app-games-list-view",
  templateUrl: "./games-list-view.component.html",
  styleUrls: ["./games-list-view.component.css"],
})
export class GamesListViewComponent implements OnInit {
  public simplePOVgames: GameCard[];
  public freePOVgames: GameCard[];

  public constructor(public gameCardsService: GameCardsService, public socketService: SocketService) { 
    /*
    this.games = [{title: "Hello", image: "image1", bestTimeSolo: [1, 2, 3], bestTimeOnline: [4, 5, 6]},
             {title: "Hello2", image: "image2", bestTimeSolo: [11, 22, 33], bestTimeOnline: [44, 55, 66]}];
*/
    this.gameCardsService.getGameCards(POVType.Simple).subscribe((cards) => {
      this.simplePOVgames = cards;
    });

    this.gameCardsService.getGameCards(POVType.Free).subscribe((cards) => {
      this.freePOVgames = cards;
    });

  }

  public ngOnInit(): void {
    this.socketService.onGameCardAdded().subscribe((card) => this.addGameCard(card));
    this.socketService.onGameCardDeleted().subscribe((card) => this.removeGameCard(card));
    this.socketService.onGameCardUpdate().subscribe((card) => this.updateGameCard(card));
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
      if (array[i].id === gameCard.id) {
         array.splice(i, 1);
      }
    }
  }

  private updateGameCard(gameCard: GameCard): void {
    const array: GameCard[] = gameCard.pov === POVType.Simple
    ? this.simplePOVgames
    : this.freePOVgames;

    for (let i: number = 0; i < array.length; --i) {
      if (array[i].id === gameCard.id) {
         array[i] = gameCard;
      }
    }
  }

}
