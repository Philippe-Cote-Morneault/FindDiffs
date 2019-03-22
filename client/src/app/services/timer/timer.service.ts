import { Injectable } from "@angular/core";
import Timer from "easytimer.js";
import { Event } from "../../../../../common/communication/webSocket/socketMessage";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class TimerService implements SocketSubscriber {
    private static readonly MINUTES_POSITION: number = 3;
    private timer: Timer;
    private chronometer: HTMLElement;
    public gameStarted: boolean;

    public constructor(private socketService: SocketHandlerService) {
        this.timer = new Timer();
        this.gameStarted = false;
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
                return this.startTimer();
            }
            case Event.GameEnded: {
                return this.stopTimer();
            }
            default: {
                break;
            }
        }
    }

    public startTimer(): void {
        this.timer.reset();
        this.timer.start();
        this.gameStarted = true;
        this.timer.addEventListener("secondsUpdated", () =>
            this.chronometer.innerText = this.getTimeValues());
    }

    public stopTimer(): void {
        this.timer.stop();
    }

    public getTimeValues(): string {
        return this.timer.getTimeValues().toString().slice(TimerService.MINUTES_POSITION);
    }
}
