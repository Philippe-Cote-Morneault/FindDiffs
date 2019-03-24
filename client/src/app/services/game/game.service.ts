import { Injectable } from "@angular/core";
import Timer from "easytimer.js";
import { Subject } from "rxjs";
import { R } from "src/app/ressources/strings";
import { ICommonDifferenceFound } from "../../../../../common/communication/webSocket/differenceFound";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class GameService implements SocketSubscriber {
    private static readonly MINUTES_POSITION: number = 3;
    private timer: Timer;
    private chronometer: HTMLElement;
    private gameStarted: boolean;
    private isGameOver: boolean;
    private differenceSound: HTMLAudioElement;
    private differenceUser: HTMLElement;
    public gameEnded: Subject<boolean>;

    public constructor(private socketService: SocketHandlerService) {
        this.timer = new Timer();
        this.gameStarted = false;
        this.gameEnded = new Subject<boolean>();
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
                return this.stopGame();
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

    private stopGame(): void {
        this.timer.stop();
        this.isGameOver = true;
        this.gameEnded.next(this.isGameOver);
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
}
