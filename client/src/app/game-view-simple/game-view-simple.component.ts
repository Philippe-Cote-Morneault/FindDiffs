import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { IdentificationError } from "../services/IdentificationError/identificationError.service";
import { GameService } from "../services/game/game.service";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { CanvasLoaderService } from "../services/image-pair/canvasLoader.service";
import { ImagePairService } from "../services/image-pair/image-pair.service";
import { PixelRestoration } from "../services/pixelManipulation/pixel-restoration";
import { Chat } from "../services/socket/chat";
import { ChatFormaterService } from "../services/socket/chatFormater.service";
import { SocketHandlerService } from "../services/socket/socketHandler.service";

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
    // private differenceCounterUser: number;
    private chat: Chat;
    private pixelRestoration: PixelRestoration;
    private identificationError: IdentificationError;
    private game: GameService;
    private canvasLoader: CanvasLoaderService;

    public constructor(
        private route: ActivatedRoute,
        public imagePairService: ImagePairService,
        public gamesCardService: GamesCardService,
        public socket: SocketHandlerService) {

        this.chat = new Chat(new SocketHandlerService, new ChatFormaterService);
        this.identificationError = new IdentificationError(new SocketHandlerService);
        this.pixelRestoration = new PixelRestoration(new SocketHandlerService);
        this.game = new GameService(new SocketHandlerService);
        this.canvasLoader = new CanvasLoaderService(this.identificationError, this.socket, this.game);

        this.isGameOver = false;
        this.game.gameEnded.subscribe((value) => {
            this.isGameOver = value;
          });
        // this.differenceCounterUser = 0;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardId = params["id"];
        });

        this.getGameCardById();
        this.setServicesContainers();
    }

    private setServicesContainers(): void {
        this.game.setContainers(this.chronometer.nativeElement);
        this.chat.setContainers(this.message.nativeElement, this.messageContainer.nativeElement);
        this.identificationError.setContainers(this.errorMessage.nativeElement,
                                               this.originalCanvas.nativeElement,
                                               this.modifiedCanvas.nativeElement);
        this.pixelRestoration.setContainers(this.originalCanvas.nativeElement, this.modifiedCanvas.nativeElement);
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
            this.canvasLoader.loadCanvas(this.modifiedCanvas.nativeElement, imagePair.url_modified);
            this.canvasLoader.loadCanvas(this.originalCanvas.nativeElement, imagePair.url_original);
            this.socket.emitReadyToPlay();
        });
    }
}
