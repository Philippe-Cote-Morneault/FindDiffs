import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { expect } from "chai";
import { ICommonGame } from "../../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { MatchmakingService } from "./matchmaking.service";

describe("MatchmakingService", () => {
    let service: MatchmakingService;
    let router: Router;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        service = TestBed.get(MatchmakingService);
        router = TestBed.get(Router);
    });

    it("Should correctly route the page when the game is simple", async () => {
        const game: ICommonGame = { game_card_id: "1231231", ressource_id: "2312312", pov: 0};
        const message: ICommonSocketMessage = {
            data: game,
            timestamp: new Date(),
        };
        const spy: jasmine.Spy = spyOn(router, "navigateByUrl");
        service.notify(Event.EndMatchmaking, message);
        // tslint:disable-next-line:no-any
        const url: any = spy.calls.first().args[0];

        expect(url).to.equal("/gameSimple/1231231");
    });

    it("Should correctly route the page when the game is free", async () => {
        const game: ICommonGame = { game_card_id: "1231231", ressource_id: "2312312", pov: 1};
        const message: ICommonSocketMessage = {
            data: game,
            timestamp: new Date(),
        };
        const spy: jasmine.Spy = spyOn(router, "navigateByUrl");
        service.notify(Event.EndMatchmaking, message);
        // tslint:disable-next-line:no-any
        const url: any = spy.calls.first().args[0];

        expect(url).to.equal("/gameFree/1231231");
    });

    describe("getIsActive, setIsAvtive", () => {
        it("Should return true if the game is solo", async () => {
            service.setIsActive(true);
            expect(service.getIsActive()).to.equal(true);
        });
        it("Should return false by default", async () => {
            expect(service.getIsActive()).to.equal(false);
        });
        it("Should return false if the game is multiplayer", async () => {
            service.setIsActive(false);
            expect(service.getIsActive()).to.equal(false);
        });
    });
});
