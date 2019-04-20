import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { expect } from "chai";
import { ICommonGameEnding } from "../../../../../common/communication/webSocket/gameEnding";
import { ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { PlayerTimeService } from "./playerTime.service";

describe("GameService", () => {
    let service: PlayerTimeService;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        service = TestBed.get(PlayerTimeService);
    });

    it("Should return the correct string at the end of the game (4000ms)", async () => {
        const game: ICommonGameEnding = {
            winner: "",
            time: 4000,
        };
        const msg: ICommonSocketMessage = {
            data: game,
            timestamp: new Date(),
        };
        expect(service.formatPlayerTimer(msg)).to.equal("00:04");
    });
    it("Should return the correct string at the end of the game (40000ms)", async () => {
        const game: ICommonGameEnding = {
            winner: "",
            time: 40000,
        };
        const msg: ICommonSocketMessage = {
            data: game,
            timestamp: new Date(),
        };
        expect(service.formatPlayerTimer(msg)).to.equal("00:40");
    });
    it("Should return the correct string at the end of the game (100000ms)", async () => {
        const game: ICommonGameEnding = {
            winner: "",
            time: 100000,
        };
        const msg: ICommonSocketMessage = {
            data: game,
            timestamp: new Date(),
        };
        expect(service.formatPlayerTimer(msg)).to.equal("01:40");
    });
});
