import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { GamesCardService } from "../services/games-card.service";
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

    public constructor(gamesCardService: GamesCardService, private route: ActivatedRoute) {
        this.gamesCardService = gamesCardService;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params["id"];
        });

        this.getGameById();
        this.canvas = (document.getElementById("myCanvas") as HTMLCanvasElement);
        this.canvas.addEventListener("click", this.getClickPosition);
    }

    private getGameById(): void {
        this.gamesCardService.getGameById(this.id).subscribe((gameCard: ICommonGameCard) => {
            this.gameCard = gameCard;
        });
    }

    // tslint:disable-next-line:no-any
    public getClickPosition(e: any): void {
        this.canvas = (document.getElementById("myCanvas") as HTMLCanvasElement);
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        const xPosition: number = e.layerX;
        const yPosition: number = e.layerY;
        if (ctx) {
            const pixel: ImageData = ctx.getImageData(xPosition, yPosition, 1, 1);
            console.log(pixel);
        }
        alert(xPosition + "::" + yPosition);
    }

}
