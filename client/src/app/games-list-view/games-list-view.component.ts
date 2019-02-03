import { Component, Input, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { GameCardLoaderService } from "../services/game-card-loader.service";
import { GamesCardViewService } from "../services/games-card.service";
import { SocketService } from "../services/socket.service";

@Component({
  selector: "app-games-list-view",
  templateUrl: "./games-list-view.component.html",
  styleUrls: ["./games-list-view.component.css"],
})
export class GamesListViewComponent implements OnInit {
  @ViewChild("simplePOVGamesContainer", { read: ViewContainerRef }) private simplePOVContainer: ViewContainerRef;
  @ViewChild("freePOVGamesContainer", { read: ViewContainerRef}) private freePOVContainer: ViewContainerRef;

  @Input() public isInAdminView: boolean;

  public simplePOVgames: ICommonGameCard[] = [];
  public freePOVgames: ICommonGameCard[] = [];

  public constructor(public gameCardsService: GamesCardViewService, public socketService: SocketService,
                     public gameCardLoaderService: GameCardLoaderService) {
  }

  public ngOnInit(): void {
    this.gameCardsService.onGameCardAdded().subscribe((card: ICommonGameCard) => this.addGameCard(card));
    this.gameCardsService.onGameCardDeleted().subscribe((card: ICommonGameCard) => this.removeGameCard(card));
    this.gameCardsService.onGameCardUpdated().subscribe((card: ICommonGameCard) => this.updateGameCard(card));

    this.gameCardLoaderService.setContainer(this.simplePOVContainer, POVType.Simple);
    this.gameCardLoaderService.setContainer(this.freePOVContainer, POVType.Free);

    this.addAllGameCards();
  }

  private addAllGameCards(): void {
    this.gameCardsService.getGameCards().subscribe((gameCards: ICommonGameCard[]) => {
      gameCards.forEach((gameCard: ICommonGameCard) => {
        this.gameCardLoaderService.addDynamicComponent(gameCard, this.isInAdminView);
      });
    });
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
