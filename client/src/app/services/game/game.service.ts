import { Injectable } from "@angular/core";
import Timer from "easytimer.js";
import { Subject } from "rxjs";
import { R } from "src/app/ressources/strings";
import { ICommonDifferenceFound } from "../../../../../common/communication/webSocket/differenceFound";
import { ICommonGameEnding } from "../../../../../common/communication/webSocket/gameEnding";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { GameEnding } from "../../models/game/gameEnding";
import { ControlsGenerator } from "../scene/sceneRenderer/controlsGenerator";
import { SceneSyncerService } from "../scene/sceneSyncer/sceneSyncer.service";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";
import { PlayerTimeService } from "./playerTime.service";

@Injectable({
    providedIn: "root",
})
export class GameService implements SocketSubscriber {
    private static readonly MINUTES_POSITION: number = 3;
    private timer: Timer;
    private isSoloGame: boolean;
    private chronometer: HTMLElement;
    private gameStarted: boolean;
    private differenceSound: HTMLAudioElement;
    public differenceUser: Subject<string>;
    public differenceOpponent: Subject<string>;
    private sceneSyncer: SceneSyncerService;
    public gameEnded: Subject<GameEnding>;
    private username: string | null;

    public constructor(private socketService: SocketHandlerService, private playerTimeService: PlayerTimeService) {
        this.timer = new Timer();
        this.gameStarted = false;
        this.gameEnded = new Subject<GameEnding>();
        this.differenceOpponent = new Subject<string>();
        this.differenceUser = new Subject<string>();
        this.differenceSound = new Audio;
        this.isSoloGame = true;
        this.differenceSound.src = R.DIFFERENCE_SOUND_SRC;
        this.username = sessionStorage.getItem("user");
        this.subscribeToSocket();
    }

    public setContainers(chronometer: HTMLElement): void {
        this.chronometer = chronometer;
    }

    public setControls(sceneSyncer: SceneSyncerService): void {
        this.sceneSyncer = sceneSyncer;
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.GameEnded, this);
        this.socketService.subscribe(Event.GameStarted, this);
        this.socketService.subscribe(Event.DifferenceFound, this);
    }

    public async notify(event: Event, message: ICommonSocketMessage): Promise<void> {
        switch (event) {
            case Event.GameStarted: {
                return this.startGame();
            }
            case Event.GameEnded: {
                return this.stopGame(message);
            }
            case Event.DifferenceFound: {
                return  this.differenceFound(message);
            }
            default: {
                break;
            }
        }
    }

    public resetTime(): void {
        this.timer.reset();
        this.timer.pause();
    }

    private startGame(): void {
        this.timer.start();
        this.gameStarted = true;
        this.timer.addEventListener("secondsUpdated", () =>
            this.chronometer.innerText = this.getTimeValues());
        this.setControlsLock(false);
    }

    private stopGame(message: ICommonSocketMessage): void {
        this.timer.stop();
        this.setControlsLock(true);
        const time: string = this.playerTimeService.formatPlayerTimer(message);
        const winner: string = (message.data as ICommonGameEnding).winner;
        const game: GameEnding = {
            isGameOver: true,
            winner: winner,
            time: time,
        };
        this.chronometer.innerText = time;
        this.gameEnded.next(game);
    }

    private async differenceFound(message: ICommonSocketMessage): Promise<void> {
        const difference: ICommonDifferenceFound = message.data as ICommonDifferenceFound;
        (difference.player === this.username) ?
        this.differenceUser.next(JSON.stringify(difference.difference_count)) :
        this.differenceOpponent.next(JSON.stringify(difference.difference_count));

        await this.differenceSound.play();
    }

    public getTimeValues(): string {
        return this.timer.getTimeValues().toString().slice(GameService.MINUTES_POSITION);
    }

    public getGameStarted(): boolean {
        return this.gameStarted;
    }

    public getIsSoloGame(): boolean {
        return this.isSoloGame;
    }

    public setIsSoloGame(isSoloGame: boolean): void {
        this.isSoloGame = isSoloGame;
    }

    private setControlsLock(isLocked: boolean): void {
        ControlsGenerator.isLocked = isLocked;
        this.sceneSyncer.isLocked = isLocked;
    }
}
