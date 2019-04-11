import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { expect } from "chai";
import * as sinon from "sinon";
import { ICommonDifferenceFound } from "../../../../../common/communication/webSocket/differenceFound";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { GameService } from "./game.service";

describe("GameService", () => {
    let service: GameService;
    const time: number = 2000;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        service = TestBed.get(GameService);
    });

    beforeEach(() => {
        sinon.stub(Audio.prototype, "play");
    });

    afterEach(() => {
        (Audio.prototype as sinon.SinonStub).restore();
    });
    it("Should return the correct time after game start and end after 2 sec", async () => {

        const msg: ICommonSocketMessage = { data: "", timestamp: new Date()};
        const timer: HTMLElement = document.createElement("p");
        const userDifference: HTMLElement = document.createElement("p");
        service.setContainers(timer, userDifference);
        await service.notify(Event.GameStarted, msg);
        expect(service.getGameStarted()).to.equal(true);
        expect(service.getTimeValues()).to.equal("00:00");
        setTimeout(async() => {
            await service.notify(Event.GameEnded, msg);
            expect(service.getTimeValues()).to.equal("00:02");
                }, time);
    });

    it("Should return 00:00 if the event is not supported", async () => {

        const msg: ICommonSocketMessage = { data: "", timestamp: new Date()};
        await service.notify(Event.InvalidClick, msg);
        expect(service.getGameStarted()).to.equal(false);
        expect(service.getTimeValues()).to.equal("00:00");
        setTimeout(async() => {
            await service.notify(Event.GameEnded, msg);
            expect(service.getTimeValues()).to.equal("00:00");
                }, time);
    });

    it("Should return the correct count after a difference is found", async () => {
        const timer: HTMLElement = document.createElement("p");
        const userDifference: HTMLElement = document.createElement("p");
        const diff: ICommonDifferenceFound = { player: "", difference_count: 2, reveal: {}};
        const msg: ICommonSocketMessage = { data: diff, timestamp: new Date()};
        service.setContainers(timer, userDifference);
        await service.notify(Event.DifferenceFound, msg);
        expect(userDifference.innerText).to.equal("2");
    });
});
