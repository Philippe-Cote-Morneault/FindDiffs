import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { ImagePairService } from "../services/image-pair/image-pair.service";
import { PixelPositionService } from "../services/pixelManipulation/pixel-position.service";
import { PixelRestoration } from "../services/pixelManipulation/pixel-restoration";

@Component({
    selector: "app-game-view-simple",
    templateUrl: "./game-view-simple.component.html",
    styleUrls: ["./game-view-simple.component.css"],
})
export class GameViewSimpleComponent implements OnInit {
    @ViewChild("originalCanvas") private originalCanvas: ElementRef;
    @ViewChild("modifiedCanvas") private modifiedCanvas: ElementRef;
    private imagePairId: string;
    private differenceCounterUser: number;
    private differenceFound: number[];

    private differenceSound: HTMLAudioElement;
    public identifyingDifference: boolean;

    public constructor(
        private route: ActivatedRoute,
        public pixelPositionService: PixelPositionService,
        public pixelRestoration: PixelRestoration,
        public imagePairService: ImagePairService) {

        this.differenceCounterUser = 0;
        this.differenceFound = [];
        this.identifyingDifference = false;

        this.differenceSound = new Audio;
        this.differenceSound.src = "../../assets/mario.mp3";
        this.differenceSound.load();
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
        this.identifyingDifference = true;
        const xPosition: number = e.layerX;
        const yPosition: number = e.layerY;
        this.pixelPositionService.postPixelPosition(this.imagePairId, xPosition, yPosition).subscribe(async (response) => {
            if (response.hit) {
                if (this.isANewDifference(response.difference_id)) {
                    this.pixelRestoration.restoreImage(
                        response,
                        this.originalCanvas.nativeElement,
                        this.modifiedCanvas.nativeElement);
                    await this.addDifference(response.difference_id);
                }
            }
            this.identifyingDifference = false;
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

    public async addDifference(differenceId: number): Promise<void> {
        this.differenceFound[this.differenceFound.length++] = differenceId;
        this.differenceCounterUser = this.differenceCounterUser + 1;
        await this.differenceSound.play();
    }

    public isANewDifference(differenceId: number): boolean {

        return !this.differenceFound.includes(differenceId);
    }
}
