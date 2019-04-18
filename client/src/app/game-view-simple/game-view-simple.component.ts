import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Event } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { R } from "../ressources/strings";
import { IdentificationError } from "../services/IdentificationError/identificationError.service";
import { GameService } from "../services/game/game.service";
import { MatchmakingService } from "../services/game/matchmaking.service";
import { GamesCardService } from "../services/gameCard/gamesCard.service";
import { CanvasLoaderService } from "../services/image-pair/canvasLoader.service";
import { ImagePairService } from "../services/image-pair/imagePair.service";
import { PixelRestoration } from "../services/pixelManipulation/pixelRestoration";
import { Chat } from "../services/socket/chat";
import { SocketHandlerService } from "../services/socket/socketHandler.service";

@Component({
    selector: "app-game-view-simple",
    templateUrl: "./game-view-simple.component.html",
    styleUrls: ["./game-view-simple.component.css"],
    providers: [
        PixelRestoration, GameService,
      ],
})
export class GameViewSimpleComponent implements OnInit {
    @ViewChild("originalCanvas") private originalCanvas: ElementRef;
    @ViewChild("modifiedCanvas") private modifiedCanvas: ElementRef;
    @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("errorMessage") private errorMessage: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;
    @ViewChild("message") private message: ElementRef;
    @ViewChild("message_container") private messageContainer: ElementRef;
    @ViewChild("userDifferenceFound") private userDifferenceFound: ElementRef;
    @ViewChild("opponentDifferenceFound") private opponentDifferenceFound: ElementRef;

    private gameCardId: string;
    public gameCard: ICommonGameCard;
    private imagePairId: string;
    public isSoloGame: boolean;
    public isGameOver: boolean;
    public playerTime: string;
    public winner: string;

    public constructor(
        private route: ActivatedRoute,
        public imagePairService: ImagePairService,
        private gamesCardService: GamesCardService,
        public socketHandler: SocketHandlerService,
        public chat: Chat,
        public pixelRestoration: PixelRestoration,
        public identificationError: IdentificationError,
        public game: GameService,
        private matchmaking: MatchmakingService,
        public canvasLoader: CanvasLoaderService) {

        this.isGameOver = false;
        this.subscribeToGame();
        this.game.resetTime();
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardId = params["id"];
        });

        this.userDifferenceFound.nativeElement.innerText = R.ZERO;
        this.isSoloGame = !this.matchmaking.getIsActive();
        this.getGameCardById();
        this.setServicesContainers();
    }

    private subscribeToGame(): void {
        this.game.gameEnded.subscribe((value) => {
            this.playerTime = value.time;
            this.isGameOver = value.isGameOver;
            this.winner = value.winner;
        });

        this.game.differenceUser.subscribe((value) => {
            this.userDifferenceFound.nativeElement.innerText = value;
        });

        this.game.differenceOpponent.subscribe((value) => {
            this.opponentDifferenceFound.nativeElement.innerText = value;
        });

        this.game.chronometer.subscribe((value: string) => {
            this.chronometer.nativeElement.innerText = value;
        });
    }

    private setServicesContainers(): void {
        this.chat.setContainers(this.message.nativeElement, this.messageContainer.nativeElement);
        this.identificationError.setContainers(this.errorMessage.nativeElement,
                                               this.originalCanvas.nativeElement,
                                               this.modifiedCanvas.nativeElement);
        this.pixelRestoration.setContainers(this.originalCanvas.nativeElement, this.modifiedCanvas.nativeElement);
    }

    private getGameCardById(): void {
        this.gamesCardService.getGameById(this.gameCardId).subscribe((gameCard: ICommonGameCard) => {
            this.gameCard = gameCard;
            this.imagePairId = gameCard.resource_id;
            this.gameTitle.nativeElement.innerText = gameCard.title;
            this.getImagePairById();
        });
    }

    private getImagePairById(): void {
        this.imagePairService.getImagePairById(this.imagePairId).subscribe((imagePair: ICommonImagePair) => {
            this.canvasLoader.loadCanvas(this.modifiedCanvas.nativeElement, imagePair.url_modified);
            this.canvasLoader.loadCanvas(this.originalCanvas.nativeElement, imagePair.url_original);
            this.socketHandler.emitMessage(Event.ReadyToPlay, null);
        });
    }
}
