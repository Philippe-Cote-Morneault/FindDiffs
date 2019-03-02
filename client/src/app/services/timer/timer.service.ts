import { Injectable } from "@angular/core";
import Timer from "easytimer.js";

@Injectable({
    providedIn: "root",
})
export class TimerService {

    public startTimer(chronometer: HTMLElement): void {
        const timer: Timer = new Timer();
        timer.start();
        timer.addEventListener("secondsUpdated", () =>
            chronometer.innerText = timer.getTimeValues().toString());
    }
}
