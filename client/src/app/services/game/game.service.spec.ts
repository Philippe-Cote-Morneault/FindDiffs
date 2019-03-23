import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { Event } from "../../../../../common/communication/webSocket/socketMessage";
import { GameService } from "./game.service";

describe("GameService", () => {
    let service: GameService;
    const time: number = 2000;

    beforeEach(() => {
        service = TestBed.get(GameService);
    });

    it("Should return the correct time after game start and end after 2 sec", () => {

        service.notify(Event.GameStarted);
        expect(service.getGameStarted()).to.equal(true);
        expect(service.getTimeValues()).to.equal("00:00");
        setTimeout(() => {
            service.notify(Event.GameEnded);
            expect(service.getTimeValues()).to.equal("00:02");
                }, time);
    });

    it("Should return 00:00 if the event is not supported", () => {

        service.notify(Event.InvalidClick);
        expect(service.getGameStarted()).to.equal(false);
        expect(service.getTimeValues()).to.equal("00:00");
        setTimeout(() => {
            service.notify(Event.GameEnded);
            expect(service.getTimeValues()).to.equal("00:00");
                }, time);
    });
});
