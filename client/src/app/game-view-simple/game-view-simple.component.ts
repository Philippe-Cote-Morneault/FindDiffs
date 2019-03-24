import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Event } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { IdentificationError } from "../services/IdentificationError/identificationError.service";
import { GameService } from "../services/game/game.service";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { CanvasLoaderService } from "../services/image-pair/canvasLoader.service";
import { ImagePairService } from "../services/image-pair/image-pair.service";
import { PixelRestoration } from "../services/pixelManipulation/pixel-restoration";
import { Chat } from "../services/socket/chat";
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
    @ViewChild("userDifferenceFound") private userDifferenceFound: ElementRef;

    private gameCardId: string;
    private imagePairId: string;
    public isGameOver: boolean;
    public playerTime: string;

    public constructor(
        private route: ActivatedRoute,
        public imagePairService: ImagePairService,
        private gamesCardService: GamesCardService,
        public socketHandler: SocketHandlerService,
        public chat: Chat,
        public pixelRestoration: PixelRestoration,
        public identificationError: IdentificationError,
        public game: GameService,
        public canvasLoader: CanvasLoaderService) {

        this.isGameOver = false;
        this.game.gameEnded.subscribe((value) => {
            this.playerTime = value.time;
            this.isGameOver = value.isGameOver;
        });
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardId = params["id"];
        });

        this.userDifferenceFound.nativeElement.innerText = 0;
        this.getGameCardById();
        this.setServicesContainers();
    }

    private setServicesContainers(): void {
        this.game.setContainers(this.chronometer.nativeElement, this.userDifferenceFound.nativeElement);
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
            this.socketHandler.emitMessage(Event.ReadyToPlay, null);
        });
    }
}
