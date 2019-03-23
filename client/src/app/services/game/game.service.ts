import { Injectable } from "@angular/core";
import Timer from "easytimer.js";
import { Subject } from "rxjs";
import { Event } from "../../../../../common/communication/webSocket/socketMessage";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class GameService implements SocketSubscriber {
    private static readonly MINUTES_POSITION: number = 3;
    private timer: Timer;
    private chronometer: HTMLElement;
    public gameStarted: boolean;
    public isGameOver: boolean;
    public gameEnded: Subject<boolean>;

    public constructor(public socketService: SocketHandlerService) {
        this.timer = new Timer();
        this.gameStarted = false;
        this.gameEnded = new Subject<boolean>();
        this.subscribeToSocket();
    }

    public setContainers(chronometer: HTMLElement): void {
        this.chronometer = chronometer;
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.GameEnded, this);
        this.socketService.subscribe(Event.GameStarted, this);
    }

    public notify(event: Event): void {
        switch (event) {
            case Event.GameStarted: {
                return this.startGame();
            }
            case Event.GameEnded: {
                return this.stopGame();
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

    public getTimeValues(): string {
        return this.timer.getTimeValues().toString().slice(GameService.MINUTES_POSITION);
    }
}
