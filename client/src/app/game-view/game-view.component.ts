import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { GamesCardService } from "../services/games-card.service";
import { PixelPositionService } from "../services/pixel-position.service";
import { PixelRestorationService } from "../services/pixel-restoration.service";
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
    private originalCanvasID: string;
    private modifiedCanvasID: string;

    public constructor(
        gamesCardService: GamesCardService,
        private route: ActivatedRoute,
        public pixelPositionService: PixelPositionService,
        public pixelRestorationService: PixelRestorationService) {
        this.gamesCardService = gamesCardService;
        this.originalCanvasID = "original_canvas";
        this.modifiedCanvasID = "modified_canvas";
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params["id"];
        });

        this.getGameById();
    }

    private getGameById(): void {
        this.gamesCardService.getGameById(this.id).subscribe((gameCard: ICommonGameCard) => {
            this.gameCard = gameCard;
            this.loadCanvas(this.modifiedCanvasID, gameCard.image_pair.url_modified);
            this.loadCanvas(this.originalCanvasID, gameCard.image_pair.url_original);
        });
    }

    // tslint:disable-next-line:no-any
    public getClickPosition(e: any): void {
        const xPosition: number = e.layerX;
        const yPosition: number = e.layerY;
        this.pixelPositionService.postPixelPosition(this.gameCard.id, xPosition, yPosition).subscribe(
            this.pixelRestorationService.restoreImage);
    }

    public loadCanvas(canvasID: string, imageSrc: string): void {
        this.canvas = (document.getElementById(canvasID) as HTMLCanvasElement);
        this.canvas.addEventListener("click", this.getClickPosition.bind(this));
        const canvasContext: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        const image: HTMLImageElement = new Image();
        image.src = imageSrc;
        if (canvasContext) {
            canvasContext.drawImage(image, 0, 0);
        }
    }
}
