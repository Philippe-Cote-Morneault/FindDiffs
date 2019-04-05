import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../../../../common/communication/message";
import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonGameCard, ICommonScoreEntry, POVType } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { MatchmakingService } from "../services/game/matchmaking.service";
import { GamesCardService } from "../services/gameCard/gamesCard.service";
import { ImagePairService } from "../services/image-pair/imagePair.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";
import { SocketHandlerService } from "../services/socket/socketHandler.service";
import { StringFormater } from "../util/stringFormater";

@Component({
    selector: "app-games-card-view",
    providers: [SceneLoaderService],
    templateUrl: "./games-card-view.component.html",
    styleUrls: ["./games-card-view.component.css"],
})
export class GamesCardViewComponent implements OnInit {
    @Input() public gameCard: ICommonGameCard;
    @Input() public isInAdminView: boolean;
    @ViewChild("image") private image: ElementRef;
    public imagePair: ICommonImagePair;
    public scenePair: ICommonScene;

    public leftButton: string;
    public rightButton: string;
    public simplePOV: string;

    public waitOpponent: boolean;

    public constructor(
        private gamesCardService: GamesCardService,
        private sceneService: SceneService,
        private router: Router,
        private socketHandlerService: SocketHandlerService,
        private imagePairService: ImagePairService,
        public matchmaking: MatchmakingService) {
            this.rightButton = "Create";
            this.leftButton = "Play";
            this.simplePOV = "Simple";
            this.isInAdminView = false;
            this.waitOpponent = false;
        }

    public ngOnInit(): void {
        if (this.isInAdminView) {
            this.leftButton = "Delete";
            this.rightButton = "Reset";
        }

        if (this.isSimplePov()) {
            this.getImagePairById();
        } else {
            this.getScenePairById();
        }
    }

    public toMinutes(index: number, times: ICommonScoreEntry[]): string {
        return StringFormater.secondsToMinutes(times[index].score);
    }

    public async onLeftButtonClick(): Promise<void> {
        if (this.isInAdminView) {
            this.deleteGameCard();
        } else {
            const gameUrl: string = (this.isSimplePov()) ? "/gameSimple/" : "/gameFree/";
            this.playSoloGame(gameUrl);
        }
    }

    private emitPlayGame(event: Event): void {
        const game: ICommonGame = {
            ressource_id: this.gameCard.resource_id,
            game_card_id: this.gameCard.id,
            pov: +POVType[this.gameCard.pov],
        };
        const message: ICommonSocketMessage = {
            data: game,
            timestamp: new Date(),
        };
        this.socketHandlerService.emitMessage(event, message);
    }

    private async playSoloGame(gameUrl: string): Promise<void> {
        await this.gamesCardService.getGameById(this.gameCard.id).subscribe(async (response: ICommonGameCard | Message) => {
            if ((response as ICommonGameCard).id) {
                this.matchmaking.setIsActive(false);
                await this.router.navigateByUrl(gameUrl + this.gameCard.id);
                this.emitPlayGame(Event.PlaySoloGame);
            } else {
                alert("This game has been deleted, please try another one.");
            }
        });
    }

    private async playMultiplayerGame(): Promise<void> {
        await this.gamesCardService.getGameById(this.gameCard.id).subscribe(async (response: ICommonGameCard | Message) => {
            if ((response as ICommonGameCard).id) {
                this.waitOpponent = true;
                this.matchmaking.setIsActive(true);
                this.emitPlayGame(Event.PlayMultiplayerGame);
            } else {
                alert("This game has been deleted, please try another one.");
            }
        });
    }

    public async onRightButtonClick(): Promise<void> {
        (this.isInAdminView) ?
        this.resetBestTimes() :
        this.playMultiplayerGame();
    }

    public deleteGameCard(): void {
        if (confirm("Are you sure you want to delete the Game Card called " + this.gameCard.title + "?")) {
            this.gamesCardService.deleteGameCard(this.gameCard.id).subscribe(() => {
                window.location.reload();
            });
        }
    }

    public resetBestTimes(): void {
        if (confirm("Are you sure you want to reset the best times of the Game Card called " + this.gameCard.title + "?")) {
            this.gamesCardService.resetBestTimes(this.gameCard).subscribe((message: Message) => {
                if (message.title !== "Error") {
                    window.location.reload();
                }
            });
        }
    }

    private isSimplePov(): boolean {
        return this.gameCard.pov.toString() === this.simplePOV;
    }

    private getImagePairById(): void {
        this.imagePairService.getImagePairById(this.gameCard.resource_id).subscribe((imagePair: ICommonImagePair) => {
            this.imagePair = imagePair;
            this.image.nativeElement.src = imagePair.url_original;
        });
    }

    private getScenePairById(): void {
        this.sceneService.getSceneById(this.gameCard.resource_id).subscribe((scenePair: ICommonScene) => {
            this.scenePair = scenePair;
            this.image.nativeElement.src = `http://localhost:3000/scene/${scenePair.id}/thumbnail`;
        });
    }

    public onClosed(closed: boolean): void {
        if (closed) {
            this.waitOpponent = false;
            const message: ICommonSocketMessage = {
                data: this.gameCard.resource_id,
                timestamp: new Date(),
            };
            this.socketHandlerService.emitMessage(Event.CancelMatchmaking, message);
        }
    }
}
