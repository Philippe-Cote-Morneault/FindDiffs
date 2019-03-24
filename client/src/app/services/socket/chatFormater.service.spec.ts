import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommonUser } from "../../../../../common/communication/webSocket/user";
import { ChatFormaterService } from "./chatFormater.service";

describe("ChatFormater", () => {
    let service: ChatFormaterService;
    const time: number = 9;
    beforeEach(() => {
        service = TestBed.get(ChatFormaterService);
    });

    it("Should return the correct string after InvalidClick Event", () => {
        const msg: ICommonSocketMessage = {data: "", timestamp: new Date()};
        const result: string = service.formatMessage(Event.InvalidClick, msg);

        expect(result.slice(time)).to.equal("Error.");
    });

    it("Should return the correct string after DifferenceFound Event", () => {
        const msg: ICommonSocketMessage = {data: "", timestamp: new Date()};
        const result: string = service.formatMessage(Event.DifferenceFound, msg);

        expect(result.slice(time)).to.equal("Difference found.");
    });

    it("Should return the correct string after NewUser Event", () => {
        const user: ICommonUser = { username: "Daddy"};
        const msg: ICommonSocketMessage = {data: user, timestamp: new Date()};
        const result: string = service.formatMessage(Event.NewUser, msg);

        expect(result.slice(time)).to.equal("The user Daddy is now online!");
    });

    it("Should return the correct string after UserDisconnected Event", () => {
        const user: ICommonUser = { username: "Daddy"};
        const msg: ICommonSocketMessage = {data: user, timestamp: new Date()};
        const result: string = service.formatMessage(Event.UserDisconnected, msg);

        expect(result.slice(time)).to.equal("The user Daddy is now offline!");
    });

    it("Should return the correct string if event not supported", () => {
        const msg: ICommonSocketMessage = {data: "", timestamp: new Date()};
        const result: string = service.formatMessage(Event.GameEnded, msg);

        expect(result).to.equal("This message type is not supported: GameEnded");
    });
});
