import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { GamesCardService } from "../services/games-card.service";
import { PixelPositionService } from "../services/pixel-position.service";
import { PixelRestorationService } from "../services/pixel-restoration.service";

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

  // tslint:disable-next-line:no-suspicious-comment
  // TODO: initialize in constructor

  public constructor(
    gamesCardService: GamesCardService,
    private route: ActivatedRoute,
    public pixelPositionService: PixelPositionService,
    public pixelRestorationService: PixelRestorationService) {
    this.gamesCardService = gamesCardService;
    this.getGameById();
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
    });

    this.getGameById();
    this.canvas = (document.getElementById("original_canvas") as HTMLCanvasElement);
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
    this.pixelPositionService.postPixelPosition(this.gameCard.id, xPosition, yPosition).subscribe(
      this.pixelRestorationService.restoreImage);
  }
}
