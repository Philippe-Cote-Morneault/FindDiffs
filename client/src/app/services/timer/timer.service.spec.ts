import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { TimerService } from "./timer.service";

describe("TimerService", () => {
    let service: TimerService;
    const time: number = 2000;

    beforeEach(() => {
        service = TestBed.get(TimerService);
    });

    it("Should return the correct time", () => {
        const p: HTMLElement = document.createElement("p");

        service.startTimer(p);
        expect(service.timer.getTimeValues().toString()).to.equal("00:00:00");
        setTimeout(() => {
            service.stopTimer();
            expect(service.timer.getTimeValues().toString()).to.equal("00:00:02");
                }, time);
    });
});
