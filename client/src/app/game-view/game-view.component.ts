import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
    @ViewChild("originalCanvas") private originalCanvas: ElementRef;
    @ViewChild("modifiedCanvas") private modifiedCanvas: ElementRef;
    private imagePairId: string;
    private differenceCounterUser: number;
    private differenceFound: number[];
    // tslint:disable-next-line:no-any
    private differenceSound: any;

    public constructor(
        private route: ActivatedRoute,
        public pixelPositionService: PixelPositionService,
        public pixelRestorationService: PixelRestorationService,
        public imagePairService: ImagePairService) {
        this.differenceCounterUser = 0;
        this.differenceSound = new Audio;
        this.differenceSound.src = "../../assets/mario.mp3";
        this.differenceSound.load();
        this.differenceFound = [];
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.imagePairId = params["id"];
        });

        this.getImagePairById();
    }

    private getImagePairById(): void {
        this.imagePairService.getImagePairById(this.imagePairId).subscribe((imagePair: ICommonImagePair) => {
            this.loadCanvas(this.modifiedCanvas.nativeElement, imagePair.url_modified);
            this.loadCanvas(this.originalCanvas.nativeElement, imagePair.url_original);
        });
    }

    // tslint:disable-next-line:no-any
    public getClickPosition(e: any): void {
        const xPosition: number = e.layerX;
        const yPosition: number = e.layerY;
        this.pixelPositionService.postPixelPosition(this.imagePairId, xPosition, yPosition).subscribe((response) => {
            if (response.hit) {
                const hashDifference: number = response.pixels_affected.length;
                if (this.isANewDifference(hashDifference)) {
                    this.pixelRestorationService.restoreImage(response,
                                                              this.originalCanvas.nativeElement,
                                                              this.modifiedCanvas.nativeElement);
                    this.addDifference(hashDifference);
                }
            }
        });
    }

    // tslint:disable:no-any
    public loadCanvas(canvas: any, imageSrc: string): void {
        canvas.addEventListener("click", (e: any) => this.getClickPosition(e));
        const canvasContext: CanvasRenderingContext2D | null = canvas.getContext("2d");
        const image: HTMLImageElement = new Image();
        image.crossOrigin = "Anonymous";
        image.src = imageSrc;
        image.onload = () => {
            if (canvasContext) {
                canvasContext.drawImage(image, 0, 0);
            }
        };
    }

    public addDifference(hashDifference: number): void {
        this.differenceFound[this.differenceFound.length++] = hashDifference;
        this.differenceCounterUser = this.differenceCounterUser + 1;
        this.differenceSound.play();
    }

    public isANewDifference(hashDifference: number): boolean {

        return !this.differenceFound.includes(hashDifference);
    }
}
