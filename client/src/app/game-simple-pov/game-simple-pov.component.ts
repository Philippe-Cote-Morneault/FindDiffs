import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game-simple-pov",
  templateUrl: "./game-simple-pov.component.html",
  styleUrls: ["./game-simple-pov.component.css"],
})
export class GameSimplePovComponent implements OnInit {
  private originalCanvasID: string;
  private modifiedCanvasID: string;
  private canvas: HTMLCanvasElement;

  public constructor() {
    this.originalCanvasID = "original_canvas";
    this.modifiedCanvasID = "modified_canvas";
   }

  public ngOnInit(): void {
  this.getImagePairById();
  }

  private getImagePairById(): void {
    this.imagePairService.getImagePairById(this.imagePairId).subscribe((imagePair: ICommonImagePair) => {
        // this.imagePair = imagePair;
        this.loadCanvas(this.modifiedCanvasID, imagePair.url_modified);
        this.loadCanvas(this.originalCanvasID, imagePair.url_original);
    });
  }

      // tslint:disable-next-line:no-any
      public getClickPosition(e: any): void {
        const xPosition: number = e.layerX;
        const yPosition: number = e.layerY;
        this.pixelPositionService.postPixelPosition(this.imagePairId, xPosition, yPosition).subscribe(
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
