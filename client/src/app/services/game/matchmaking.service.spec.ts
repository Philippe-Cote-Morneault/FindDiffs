import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { expect } from "chai";
import { GamesCardViewComponent } from "src/app/games-card-view/games-card-view.component";
import { WaitingViewComponent } from "src/app/waiting-view/waiting-view.component";
import { ICommonGame } from "../../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { POVType } from "../../../../../common/model/gameCard";
import { MatchmakingService } from "./matchmaking.service";

describe("MatchmakingService", () => {
    let service: MatchmakingService;
    let router: Router;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [GamesCardViewComponent, WaitingViewComponent],
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

    describe("MatchmakingChange event", () => {
        let fakeComponent: GamesCardViewComponent;

        beforeEach(async () => {
            fakeComponent = TestBed.createComponent(GamesCardViewComponent).componentInstance;
        });
        describe("setGameList()", () => {
            it("should add a GamesCardViewComponent to the list", () => {
                service.setGameList([fakeComponent]);
                expect(service.gameList.length).to.equal(1);
                expect(service.gameList[0]).to.equal(fakeComponent);
            });

            it("should add multiple GamesCadViewComponents to the list", () => {
                service.setGameList([fakeComponent, fakeComponent, fakeComponent]);
                expect(service.gameList.length).to.equal(3);
                service.gameList.forEach((game: GamesCardViewComponent) => {
                    expect(game).to.equal(fakeComponent);
                });
            });
        });

        describe("changeToJoin", () => {

            it("should change the button text to 'Join' and the backgorund color to blue", async () => {
                fakeComponent.gameCard = {id: "", pov: POVType.Simple, title: "", resource_id: "123321",
                                          best_time_solo: [], best_time_online: []};
                service.setGameList([fakeComponent]);
                await service.notify(Event.MatchmakingChange, {data: [fakeComponent.gameCard.resource_id], timestamp: new Date()});
                expect(fakeComponent.rightButton).to.equal("Join");
                expect(fakeComponent.matchMakingButton.nativeElement.style.backgroundColor).to.equal("blue");
            });
        });
    });
});
