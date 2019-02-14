import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { GamesCardService } from "../services/games-card.service";
import { ImagePairService } from "../services/image-pair.service";
import { PixelPositionService } from "../services/pixel-position.service";
import { PixelRestorationService } from "../services/pixel-restoration.service";

@Component({
  selector: "app-game-simple-pov",
  templateUrl: "./game-simple-pov.component.html",
  styleUrls: ["./game-simple-pov.component.css"],
})
export class GameSimplePovComponent implements OnInit {
  public gameCard: ICommonGameCard;
  private id: string;
  private originalCanvasID: string;
  private modifiedCanvasID: string;
  private canvas: HTMLCanvasElement;

  public constructor(
    private route: ActivatedRoute,
    public pixelPositionService: PixelPositionService,
    public pixelRestorationService: PixelRestorationService,
    public imagePairService: ImagePairService,
    public gameCardService: GamesCardService) {
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
    this.gameCardService.getGameById(this.id).subscribe((gameCard: ICommonGameCard) => {
      this.gameCard = gameCard;
    });

    this.getImagePairById();
  }

  private getImagePairById(): void {
    this.imagePairService.getImagePairById(this.gameCard.resource_id).subscribe((imagePair: ICommonImagePair) => {
      this.loadCanvas(this.modifiedCanvasID, imagePair.url_modified);
      this.loadCanvas(this.originalCanvasID, imagePair.url_original);
    });
  }

  // tslint:disable-next-line:no-any
  public getClickPosition(e: any): void {
    const xPosition: number = e.layerX;
    const yPosition: number = e.layerY;
    this.pixelPositionService.postPixelPosition(this.id, xPosition, yPosition).subscribe(
      this.pixelRestorationService.restoreImage);
  }

  public loadCanvas(canvasID: string, imageSrc: string): void {
    this.canvas = (document.getElementById(canvasID) as HTMLCanvasElement);
    this.canvas.addEventListener("click", this.getClickPosition.bind(this));
    const canvasContext: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
    const image: HTMLImageElement = new Image();
    image.src = imageSrc;
    image.onload = () => {
      if (canvasContext) {
        canvasContext.drawImage(image, 0, 0);
      }
    };
    image.crossOrigin = "Anonymous";
  }
}
