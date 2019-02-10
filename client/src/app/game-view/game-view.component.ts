import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { GamesCardService } from "../services/games-card.service";
import { PixelPositionService } from "../services/pixel-position.service";
// import { ConvertActionBindingResult } from "@angular/compiler/src/compiler_util/expression_converter";

@Component({
    selector: "app-game-view",
    templateUrl: "./game-view.component.html",
    styleUrls: ["./game-view.component.css"],
})
export class GameViewComponent implements OnInit {
    public gameCard: ICommonGameCard;
    private gamesCardService: GamesCardService;

    private id: string;
    private canvas: HTMLCanvasElement;

    public constructor(
        gamesCardService: GamesCardService,
        private route: ActivatedRoute,
        public pixelPositionService: PixelPositionService) {
        this.gamesCardService = gamesCardService;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params["id"];
        });

        this.getGameById();
        this.canvas = (document.getElementById("myCanvas") as HTMLCanvasElement);
        this.canvas.addEventListener("click", this.getClickPosition.bind(this));
    }

    private getGameById(): void {
        this.gamesCardService.getGameById(this.id).subscribe((gameCard: ICommonGameCard) => {
            this.gameCard = gameCard;
        });
    }

    // tslint:disable-next-line:no-any
    public getClickPosition(e: any): void {
        const xPosition: number = e.layerX;
        const yPosition: number = e.layerY;
        this.pixelPositionService.postPixelPosition(this.gameCard.id, xPosition, yPosition).subscribe(/*Do something*/ );
    }
}
