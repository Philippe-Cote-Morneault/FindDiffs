import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { DifferenceFoundManager } from "../services/IdentificationError/DifferenceFoundManager.service";
import { IdentificationError } from "../services/IdentificationError/identificationError.service";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { ImagePairService } from "../services/image-pair/image-pair.service";
import { PixelPositionService } from "../services/pixelManipulation/pixel-position.service";
import { PixelRestoration } from "../services/pixelManipulation/pixel-restoration";
import { Chat } from "../services/socket/chat";
import { ChatFormaterService } from "../services/socket/chatFormater.service";
import { SocketHandlerService } from "../services/socket/socketHandler.service";
import { TimerService } from "../services/timer/timer.service";

@Component({
    selector: "app-game-view-simple",
    templateUrl: "./game-view-simple.component.html",
    styleUrls: ["./game-view-simple.component.css"],
})
export class GameViewSimpleComponent implements OnInit {
    @ViewChild("originalCanvas") private originalCanvas: ElementRef;
    @ViewChild("modifiedCanvas") private modifiedCanvas: ElementRef;
    @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("errorMessage") private errorMessage: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;
    @ViewChild("message") private message: ElementRef;
    @ViewChild("message_container") private messageContainer: ElementRef;

    private gameCardId: string;
    private imagePairId: string;
    public isGameOver: boolean;
    private differenceCounterUser: number;
    private chat: Chat;
    private pixelRestoration: PixelRestoration;
    private identificationError: IdentificationError;
    private timerService: TimerService;
    private differenceFoundManager: DifferenceFoundManager;

    public constructor(
        private route: ActivatedRoute,
        public pixelPositionService: PixelPositionService,
        public imagePairService: ImagePairService,
        public gamesCardService: GamesCardService,
        public socket: SocketHandlerService) {

        this.chat = new Chat(new SocketHandlerService, new ChatFormaterService);
        this.identificationError = new IdentificationError(new SocketHandlerService);
        this.pixelRestoration = new PixelRestoration();
        this.differenceFoundManager = new DifferenceFoundManager(new SocketHandlerService, this.pixelRestoration);
        this.timerService = new TimerService(new SocketHandlerService);
        this.isGameOver = false;
        this.differenceCounterUser = 0;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardId = params["id"];
        });

        this.getGameCardById();
        this.subscribeToServices();
    }

    private subscribeToServices(): void {
        this.timerService.setContainers(this.chronometer.nativeElement);
        this.chat.setContainers(this.message.nativeElement, this.messageContainer.nativeElement);
        this.identificationError.setContainers(this.errorMessage.nativeElement,
                                               this.originalCanvas.nativeElement,
                                               this.modifiedCanvas.nativeElement);
        this.differenceFoundManager.setContainers(this.differenceCounterUser);
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
        });
    }

    // tslint:disable-next-line:no-any
    public getClickPosition(e: any): void {
        if (!this.identificationError.timeout) {
            this.identificationError.moveClickError(e.pageX, e.pageY);
            this.socket.emitClick(e.layerX, e.layerY);
            this.identificationError.showErrorMessage();
            /*this.pixelPositionService.postPixelPosition(this.imagePairId, e.layerX, e.layerY).subscribe(async (response) => {
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
            });*/
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

    /*public async addDifference(differenceId: number): Promise<void> {
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
        this.playerTime = ((this.chronometer.nativeElement) as HTMLElement).innerText;
        this.isGameOver = true;
    }*/
}
