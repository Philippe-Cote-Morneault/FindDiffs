import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { ImagePairService } from "../services/image-pair.service";
import { PixelPositionService } from "../services/pixel-position.service";
import { PixelRestorationService } from "../services/pixel-restoration.service";

@Component({
    selector: "app-game-view",
    templateUrl: "./game-view.component.html",
    styleUrls: ["./game-view.component.css"],
})
export class GameViewComponent implements OnInit {
    public imagePair: ICommonImagePair;
    private imagePairId: string;
    private differenceCounterUser: number;
    private differenceCounterOpponent: number;
    private isSolo: boolean;
    private canvas: HTMLCanvasElement;
    private originalCanvasID: string;
    private modifiedCanvasID: string;

    public constructor(
        private route: ActivatedRoute,
        public pixelPositionService: PixelPositionService,
        public pixelRestorationService: PixelRestorationService,
        public imagePairService: ImagePairService) {
        this.imagePairService = imagePairService;
        this.isSolo = false;
        this.differenceCounterOpponent = 0;
        this.differenceCounterUser = 0;
        this.originalCanvasID = "original_canvas";
        this.modifiedCanvasID = "modified_canvas";
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.imagePairId = params["id"];
        });

        this.getImagePairById();
        this.canvas = (document.getElementById("original_canvas") as HTMLCanvasElement);
        this.canvas.addEventListener("click", this.getClickPosition.bind(this));
    }

    private getImagePairById(): void {
        this.imagePairService.getImagePairById(this.imagePairId).subscribe((imagePair: ICommonImagePair) => {
            this.imagePair = this.imagePair;
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
        if (canvasContext) {
            canvasContext.drawImage(image, 0, 0);
        }
    }
}
