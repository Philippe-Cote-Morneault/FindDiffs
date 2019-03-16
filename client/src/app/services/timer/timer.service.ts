import { Injectable } from "@angular/core";
import Timer from "easytimer.js";

@Injectable({
    providedIn: "root",
})
export class TimerService {
    private static MINUTES_POSITION: number = 3;
    public timer: Timer;

    public constructor() {
        this.timer = new Timer();
    }
    public startTimer(chronometer: HTMLElement): void {
        this.timer.reset();
        this.timer.start();
        this.timer.addEventListener("secondsUpdated", () =>
            chronometer.innerText = this.timer.getTimeValues().toString().slice(TimerService.MINUTES_POSITION));
    }

    public stopTimer(): void {
        this.timer.stop();
    }
}
