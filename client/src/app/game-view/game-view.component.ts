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
    // public imagePair: ICommonImagePair;
    private id: string;
    public gameCard: ICommonGameCard;
    private differenceCounterUser: number;
    private differenceCounterOpponent: number;
    private isSolo: boolean;

    public constructor(
        private route: ActivatedRoute,
        private gameCardService: GamesCardService) {
        this.isSolo = true;
        this.differenceCounterOpponent = 0;
        this.differenceCounterUser = 0;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params["id"];
        });

        this.getGameById();
    }

    private getGameById(): void {
    this.gameCardService.getGameById(this.id).subscribe((gameCard: ICommonGameCard) => {
        this.gameCard = gameCard;
    });
  }
}
