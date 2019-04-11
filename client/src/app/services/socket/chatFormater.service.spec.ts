import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { expect } from "chai";
import { ICommonDifferenceFound } from "../../../../../common/communication/webSocket/differenceFound";
import { ICommonIdentificationError } from "../../../../../common/communication/webSocket/identificationError";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommonUser } from "../../../../../common/communication/webSocket/user";
import { INewScore, INewScoreDetails } from "../../../../../common/model/score";
import { MatchmakingService } from "../game/matchmaking.service";
import { ChatFormaterService } from "./chatFormater.service";

describe("ChatFormater", () => {
    let service: ChatFormaterService;
    let game: MatchmakingService;
    const time: number = 9;
    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        service = TestBed.get(ChatFormaterService);
        game = TestBed.get(MatchmakingService);
    });

    describe("InvalidClick", () => {

        it("Should return the correct string after InvalidClick Event (solo)", () => {
            const msg: ICommonSocketMessage = {data: "", timestamp: new Date("2019-03-25T12:00:00Z")};
            game.setIsActive(false);
            const result: string = service.formatMessage(Event.InvalidClick, msg);

            expect(result).to.equal("08:00:00 Error.");
        });

        it("Should return the correct string after InvalidClick Event (1v1)", () => {
            const data: ICommonIdentificationError = {
                player: "Dad",
            };
            game.setIsActive(true);
            const msg: ICommonSocketMessage = {data: data, timestamp: new Date("2019-03-25T12:00:00Z")};
            const result: string = service.formatMessage(Event.InvalidClick, msg);

            expect(result).to.equal("08:00:00 Error by Dad.");
        });
    });
    describe("DifferenceFound", () => {

        it("Should return the correct string after DifferenceFound Event (solo)", () => {
            const msg: ICommonSocketMessage = {data: "", timestamp: new Date("2019-03-25T12:00:00Z")};
            game.setIsActive(false);
            const result: string = service.formatMessage(Event.DifferenceFound, msg);

            expect(result).to.equal("08:00:00 Difference found.");
        });

        it("Should return the correct string after DifferenceFound Event (1v1)", () => {
            game.setIsActive(true);
            const data: ICommonDifferenceFound = {
                player: "Dad",
                difference_count: 2,
                reveal: {},
            };
            const msg: ICommonSocketMessage = {data: data, timestamp: new Date("2019-03-25T12:00:00Z")};
            const result: string = service.formatMessage(Event.DifferenceFound, msg);

            expect(result).to.equal("08:00:00 Difference found by Dad.");
        });
    });

    describe("UserConnected", () => {

        it("Should return the correct string after UserConnected Event", () => {
            const user: ICommonUser = { username: "Daddy"};
            const msg: ICommonSocketMessage = {data: user, timestamp: new Date()};
            const result: string = service.formatMessage(Event.UserConnected, msg);

            expect(result.slice(time)).to.equal("The user Daddy is now online!");
        });
    });

    describe("UserDisconnected", () => {

        it("Should return the correct string after UserDisconnected Event", () => {
            const user: ICommonUser = { username: "Daddy"};
            const msg: ICommonSocketMessage = {data: user, timestamp: new Date()};
            const result: string = service.formatMessage(Event.UserDisconnected, msg);

            expect(result.slice(time)).to.equal("The user Daddy is now offline!");
        });
    });

    describe("BestTime", () => {

        it("Should return the correct string after BestTime Event", () => {
            const data: INewScoreDetails = {
                place: 1,
                game_name: "Bamboozled",
                username: "Bamboozleur",
                game_type: 1,
            };
            const score: INewScore = {
                is_top_score: true,
                details: data,
            };
            const msg: ICommonSocketMessage = {data: score, timestamp: new Date()};
            const result: string = service.formatMessage(Event.BestTime, msg);

            expect(result.slice(time)).to.equal("Bamboozleur is now 1 place in the bests time of the game Bamboozled in 1v1.");
        });
    });

    it("Should return the correct string if event not supported", () => {
        const msg: ICommonSocketMessage = {data: "", timestamp: new Date()};
        const result: string = service.formatMessage(Event.GameEnded, msg);

        expect(result).to.equal("This message type is not supported: GameEnded");
    });
});
