import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../../../../common/communication/message";
import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonGameCard, ICommonScoreEntry, POVType } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { ImagePairService } from "../services/image-pair/image-pair.service";
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

    public constructor(
        private gamesCardService: GamesCardService,
        private sceneService: SceneService,
        private router: Router,
        private socketHandlerService: SocketHandlerService,
        private imagePairService: ImagePairService) {
            this.rightButton = "Create";
            this.leftButton = "Play";
            this.simplePOV = "Simple";
            this.isInAdminView = false;
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

            this.emitPlaySoloGame();
            await this.router.navigateByUrl(gameUrl + this.gameCard.id);
        }
    }

    private emitPlaySoloGame(): void {
        console.log(this.gameCard.pov);
        console.log(POVType[this.gameCard.pov]);
        const game: ICommonGame = {
            ressource_id: this.gameCard.resource_id,
            pov: +POVType[this.gameCard.pov],
        };
        const message: ICommonSocketMessage = {
            data: game,
            timestamp: new Date(),
        };
        this.socketHandlerService.emitMessage(Event.PlaySoloGame, message);
    }

    public onRightButtonClick(): void {
        if (this.isInAdminView) {
            this.resetBestTimes();
        }
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
}
