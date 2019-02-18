import { Component, Input, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { GameCardLoaderService } from "../services/gameCard/game-card-loader.service";
import { GamesCardService } from "../services/gameCard/games-card.service";

@Component({
    selector: "app-games-list-view",
    templateUrl: "./games-list-view.component.html",
    styleUrls: ["./games-list-view.component.css"],
})
export class GamesListViewComponent implements OnInit {
    @ViewChild("simplePOVGamesContainer", { read: ViewContainerRef }) private simplePOVContainer: ViewContainerRef;
    @ViewChild("freePOVGamesContainer", { read: ViewContainerRef }) private freePOVContainer: ViewContainerRef;

    @Input() public isInAdminView: boolean = false;

    public constructor(
        public gameCardsService: GamesCardService,
        public gameCardLoaderService: GameCardLoaderService) {
    }

    public ngOnInit(): void {
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

}
