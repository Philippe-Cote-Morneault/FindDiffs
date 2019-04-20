import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonGameCard, ICommonScoreEntry, POVType } from "../../../../common/model/gameCard";
import { R } from "../ressources/strings";
import { MatchmakingService } from "../services/game/matchmaking.service";
import { GamesCardService } from "../services/gameCard/gamesCard.service";
import { SocketHandlerService } from "../services/socket/socketHandler.service";
import { StringFormater } from "../util/stringFormater";

@Component({
    selector: "app-end-game",
    templateUrl: "./end-game.component.html",
    styleUrls: ["./end-game.component.css"],
})
export class EndGameComponent implements OnInit {

    @ViewChild("tryAgain") private tryAgain: ElementRef;

    @Input() public gameCard: ICommonGameCard;
    @Input() public playerTimeChild: string;
    @Input() public winner: string;
    @Input() public isSoloGame: boolean;

    public endingMessage: string;
    public gameCardId: string;
    private gamesListPath: string;
    public waitOpponent: boolean;

    public constructor(
        private route: ActivatedRoute,
        public gamesCardService: GamesCardService,
        private socket: SocketHandlerService,
        private router: Router,
        private matchmaking: MatchmakingService) {
        this.gamesListPath = "/gamesList";
        this.endingMessage = R.MESSAGE_WIN;
        this.gameCardId = "";
        this.isSoloGame = true;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardId = params["id"];
        });
        this.getGameCardById();
        this.verifyWinCondition();
    }

    private getGameCardById(): void {
        this.gamesCardService.getGameById(this.gameCardId).subscribe((gameCard: ICommonGameCard) => {
            this.gameCard = gameCard;
        });
    }

    public toMinutes(index: number, times: ICommonScoreEntry[]): string {
        return StringFormater.secondsToMinutes(times[index].score);
    }

    private verifyWinCondition(): void {
        if (sessionStorage.getItem("user") !== this.winner) {
            this.tryAgain.nativeElement.style.display = "block";
            this.endingMessage = R.MESSAGE_LOSE;
        }
    }

    public async leaveGame(): Promise<void> {
        await this.router.navigateByUrl(this.gamesListPath);
    }

    public async resetGame(): Promise<void> {
        this.changeMatchmakingType();
        this.matchmaking.setIsActive(true);
        const game: ICommonGame = {
            ressource_id: this.gameCard.resource_id,
            game_card_id: this.gameCard.id,
            pov: +POVType[this.gameCard.pov],
        };
        const message: ICommonSocketMessage = {
            data: game,
            timestamp: new Date(),
        };
        this.socket.emitMessage(Event.PlayMultiplayerGame, message);
    }

    public onClosed(closed: boolean): void {
        if (closed) {
            const message: ICommonSocketMessage = {
                data: this.gameCard.resource_id,
                timestamp: new Date(),
            };
            this.changeMatchmakingType();
            this.socket.emitMessage(Event.CancelMatchmaking, message);
        }
    }

    private changeMatchmakingType(): void {
        this.waitOpponent = !this.waitOpponent;
    }
}
