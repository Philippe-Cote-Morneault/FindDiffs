import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { SocketHandlerService } from "./socketHandler.service";
import { SERVER_URL } from "../../../../../common/url";
import * as io from "socket.io-client";
import { SocketSubscriber } from "./socketSubscriber";

describe("SocketHandlerService", () => {
    let service: SocketHandlerService;
    let socketClient: SocketIOClient.Socket;
    let returnValue: string;
    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        service = TestBed.get(SocketHandlerService);
        socketClient = io.connect(SERVER_URL);

        spyOn(sessionStorage, "getItem").and.callFake(() => {
            returnValue = "hello";
            return returnValue!;
        });
    });

    describe("emitMessage()", () => {
        it("Should emit the right message to the server when a new user is connected", () => {
            const msg: ICommonSocketMessage = {data: "", timestamp: new Date()};

            const event: Event = Event.NewUser;
            spyOn(service.socket, "emit").and.callFake((event: Event, msg: ICommonSocketMessage) => { });
            service.emitMessage(event, msg);
            expect(service.socket.emit).toHaveBeenCalledWith(event, msg);
        });
    });

    describe("onAutenticate()", () => {
        it("Should authenticate the user", () => {
            const message: ICommonSocketMessage = {data: "", timestamp: new Date()};
            const msg: ICommonSocketMessage = message;

            const eventAuthenticate: Event = Event.Authenticate;

            service.onAuthenticate();
            spyOn(service.socket, "on").and.callFake((event: Event, fct: Function) => {
                fct(msg);
                expect(event).toEqual(eventAuthenticate);
            });
        });
    });

    describe("manageAuthenticateEvent()", () => {
        it("Should not set the session storage", () => {
            const message: ICommonSocketMessage = {data: "hello", timestamp: new Date()};

            service.manageAuthenticateEvent(message);

            let returnValue2: string = sessionStorage.getItem("token")!;
            expect(returnValue2).not.toEqual("");
        });

        it("Should set the session storage", () => {
            const message: ICommonSocketMessage = {data: "hello", timestamp: new Date()};

            service.manageAuthenticateEvent(message);
            
            let returnValue2: string = sessionStorage.getItem("token")!;
            expect(returnValue2).toEqual(returnValue);
        });
    });

    describe("setEventListeners()", () => {
        it("Should setEventListeners on an event", () => {
            spyOn(service, "onAuthenticate");
            service.setEventListeners(socketClient);
            expect(service.onAuthenticate).toHaveBeenCalled();
        });
    });

    describe("notifySubsribers()", () => {
        it("Should notify all the subscribers", () => {
            const message: ICommonSocketMessage = {data: "hello", timestamp: new Date()};

            spyOn(service, "notifySubsribers");
            service.notifySubsribers(Event.GameClick, message);
            expect(service.notifySubsribers).toHaveBeenCalled();
        });

        it("Should not notify all the subscribers", () => {
            const message: ICommonSocketMessage = {data: "hello", timestamp: new Date()};
            service["subscribers"] = new Map<string, SocketSubscriber[]>();

            const event: Event = Event.NewUser;

            service.notifySubsribers(Event.GameClick, message);
            expect(service["subscribers"].has(event)).toBeFalsy();
        });

        it("Should notify all the subscribers", () => {
            const message: ICommonSocketMessage = {data: "hello", timestamp: new Date()};
            service["subscribers"] = new Map<string, SocketSubscriber[]>();

            const event: Event = Event.NewUser;

            service.notifySubsribers(Event.GameClick, message);
            expect(service["subscribers"].has(event)).toBeFalsy();
        });
    });
});
