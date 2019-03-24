import { Injectable } from "@angular/core";
import Timer from "easytimer.js";
import { Subject } from "rxjs";
import { R } from "src/app/ressources/strings";
import { ICommonDifferenceFound } from "../../../../../common/communication/webSocket/differenceFound";
import { ICommonGameEnding } from "../../../../../common/communication/webSocket/gameEnding";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { GameEnding } from "../../models/game/gameEnding";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class GameService implements SocketSubscriber {
    private static readonly MAX_TWO_DIGITS: number = 10;
    private static readonly MS_IN_SEC: number = 1000;
    private static readonly SEC_IN_MIN: number = 60;
    private static readonly MINUTES_POSITION: number = 3;
    private timer: Timer;
    private chronometer: HTMLElement;
    private gameStarted: boolean;
    private differenceSound: HTMLAudioElement;
    private differenceUser: HTMLElement;
    public gameEnded: Subject<GameEnding>;

    public constructor(private socketService: SocketHandlerService) {
        this.timer = new Timer();
        this.gameStarted = false;
        this.gameEnded = new Subject<GameEnding>();
        this.differenceSound = new Audio;
        this.differenceSound.src = R.DIFFERENCE_SOUND_SRC;
        this.subscribeToSocket();
    }

    public setContainers(chronometer: HTMLElement, differenceCounterUser: HTMLElement): void {
        this.chronometer = chronometer;
        this.differenceUser = differenceCounterUser;
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.GameEnded, this);
        this.socketService.subscribe(Event.GameStarted, this);
        this.socketService.subscribe(Event.DifferenceFound, this);
    }

    public notify(event: Event, message: ICommonSocketMessage): void {
        switch (event) {
            case Event.GameStarted: {
                return this.startGame();
            }
            case Event.GameEnded: {
                return this.stopGame(message);
            }
            case Event.DifferenceFound: {
                return this.differenceFound(message);
            }
            default: {
                break;
            }
        }
    }

    private startGame(): void {
        this.timer.reset();
        this.timer.start();
        this.gameStarted = true;
        this.timer.addEventListener("secondsUpdated", () =>
            this.chronometer.innerText = this.getTimeValues());
    }

    private stopGame(message: ICommonSocketMessage): void {
        this.timer.stop();
        const game: GameEnding = {
            isGameOver: true,
            time: this.formatPlayerTimer(message),
        };
        this.gameEnded.next(game);
    }

    private  differenceFound(message: ICommonSocketMessage): void {
        const difference: number = (message.data as ICommonDifferenceFound).difference_count;
        this.differenceUser.innerText = JSON.stringify(difference);
        this.differenceSound.play();
    }

    public getTimeValues(): string {
        return this.timer.getTimeValues().toString().slice(GameService.MINUTES_POSITION);
    }

    public getGameStarted(): boolean {
        return this.gameStarted;
    }

    private formatPlayerTimer(message: ICommonSocketMessage): string {
        let seconds: number | string = (message.data as ICommonGameEnding).time / GameService.MS_IN_SEC;

        // tslint:disable:radix
        const minutes: number | string = this.format_two_digits(Math.round(seconds / GameService.SEC_IN_MIN));
        seconds = this.format_two_digits(Math.round(seconds % GameService.SEC_IN_MIN));

        return minutes + R.COLON + seconds;
    }

    private format_two_digits(n: number): number | string {

        return n < GameService.MAX_TWO_DIGITS ? R.ZERO + n : n;
    }
}