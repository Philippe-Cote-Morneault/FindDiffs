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

    public constructor(chronometer: HTMLElement) {
        this.timer = new Timer();
        this.chronometer = chronometer;
    }

    public subscribeToSocket(): void {
        SocketHandlerService.getInstance().subscribe(Event.GameEnded, this);
        SocketHandlerService.getInstance().subscribe(Event.GameStarted, this);
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
