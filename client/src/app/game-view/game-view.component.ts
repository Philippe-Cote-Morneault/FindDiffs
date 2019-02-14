import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { GamesCardService } from "../services/games-card.service";

@Component({
    selector: "app-game-view",
    templateUrl: "./game-view.component.html",
    styleUrls: ["./game-view.component.css"],
})
export class GameViewComponent implements OnInit {
    private id: string;
    private gameCard: ICommonGameCard;
    // private povSimple: boolean;
    // private differenceCounterUser: number;
    // private differenceCounterOpponent: number;
    // private isSolo: boolean;

    public constructor(
        private route: ActivatedRoute,
        private gameCardService: GamesCardService) {
        // this.isSolo = true;
        // this.differenceCounterOpponent = 0;
        // this.differenceCounterUser = 0;
        // this.povSimple = true;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params["id"];
        });

        this.getGameById();
        this.isSimpleView();
    }

    private getGameById(): void {
        this.gameCardService.getGameById(this.id).subscribe((gameCard: ICommonGameCard) => {
            this.gameCard = gameCard;
        });
    }

    private isSimpleView(): boolean {
        return (this.gameCard.pov === POVType.Simple);
    }
}
