import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { IdentificationError } from "../services/IdentificationError/identificationError.service";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { ImagePairService } from "../services/image-pair/image-pair.service";
import { PixelPositionService } from "../services/pixelManipulation/pixel-position.service";
import { PixelRestoration } from "../services/pixelManipulation/pixel-restoration";
import { SocketMessageSenderService } from "../services/socket/socketMessageSender.service";
import { TimerService } from "../services/timer/timer.service";

@Component({
    selector: "app-game-view-simple",
    templateUrl: "./game-view-simple.component.html",
    styleUrls: ["./game-view-simple.component.css"],
})
export class GameViewSimpleComponent implements OnInit {
    private static MAX_DIFFERENCES: number = 7;
    private static readonly DIFFERENCE_SOUND_SRC: string = "../../assets/mario.mp3";
    @ViewChild("originalCanvas") private originalCanvas: ElementRef;
    @ViewChild("modifiedCanvas") private modifiedCanvas: ElementRef;
    @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("errorMessage") private errorMessage: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;
    // @ViewChild("message") private message: ElementRef;
    // @ViewChild("message_container") private messageContainer: ElementRef;

    private gameCardId: string;
    private imagePairId: string;
    public isGameOver: boolean;
    private differenceCounterUser: number;
    private differenceFound: number[];
    private differenceSound: HTMLAudioElement;
    public playerTime: string;

    public constructor(
        private route: ActivatedRoute,
        public pixelPositionService: PixelPositionService,
        public pixelRestoration: PixelRestoration,
        public imagePairService: ImagePairService,
        public timerService: TimerService,
        public gamesCardService: GamesCardService,
        public identificationError: IdentificationError) {

        this.isGameOver = false;
        this.differenceCounterUser = 0;
        this.differenceFound = [];

        this.differenceSound = new Audio;
        this.differenceSound.src = GameViewSimpleComponent.DIFFERENCE_SOUND_SRC;
        this.differenceSound.load();
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardId = params["id"];
        });
        this.getGameCardById();
        this.subscribeToSocket();
    }

    private subscribeToSocket(): void {
        SocketMessageSenderService.getInstance().subscribeToSocket();
    }

    private getGameCardById(): void {
        this.gamesCardService.getGameById(this.gameCardId).subscribe((gameCard: ICommonGameCard) => {
            this.imagePairId = gameCard.resource_id;
            this.gameTitle.nativeElement.innerText = gameCard.title;
            this.getImagePairById();
        });
    }

    private getImagePairById(): void {
        this.imagePairService.getImagePairById(this.imagePairId).subscribe((imagePair: ICommonImagePair) => {
            this.loadCanvas(this.modifiedCanvas.nativeElement, imagePair.url_modified);
            this.loadCanvas(this.originalCanvas.nativeElement, imagePair.url_original);
            this.timerService.startTimer(this.chronometer.nativeElement);
        });
    }

    // tslint:disable-next-line:no-any
    public getClickPosition(e: any): void {
        if (!this.identificationError.timeout) {
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
                } else {
                    await this.identificationError.showErrorMessage(e.pageX, e.pageY, this.errorMessage.nativeElement,
                                                                    this.originalCanvas.nativeElement, this.modifiedCanvas.nativeElement);
                }
            });
        }
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
        if (this.differenceCounterUser === GameViewSimpleComponent.MAX_DIFFERENCES) {
            this.gameOver();
        }
    }

    public isANewDifference(differenceId: number): boolean {

        return !this.differenceFound.includes(differenceId);
    }

    private gameOver(): void {
        this.timerService.stopTimer();
        this.playerTime = ((this.chronometer.nativeElement) as HTMLElement).innerText;
        this.isGameOver = true;
    }
}
