import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import * as io from "socket.io-client";
import { ICommonError } from "../../../../../common/communication/webSocket/error";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommonToken } from "../../../../../common/communication/webSocket/token";
import { SERVER_URL } from "../../../../../common/url";
import { IdentificationError } from "../IdentificationError/identificationError.service";
import { SocketHandlerService } from "./socketHandler.service";
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

            // tslint:disable-next-line:no-non-null-assertion
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

            // tslint:disable-next-line:no-non-null-assertion
            const returnValue2: string = sessionStorage.getItem("token")!;
            expect(returnValue2).not.toEqual("");
        });

        it("Should set the session storage", () => {
            const message: ICommonSocketMessage = {data: "hello", timestamp: new Date()};

            service.manageAuthenticateEvent(message);

            // tslint:disable-next-line:no-non-null-assertion
            const returnValue2: string = sessionStorage.getItem("token")!;
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

            const event: Event = Event.InvalidClick;

            const subscriber: IdentificationError = new IdentificationError(service);
            if (!service["subscribers"].has(event)) {
                service["subscribers"].set(event, []);
            }
            const sub: SocketSubscriber[] = service["subscribers"].get(event) as SocketSubscriber[];
            sub.push(subscriber);

            service.notifySubsribers(event, message);
            expect(service["subscribers"].has(event)).toBeTruthy();
        });

        it("Should notify all the subscribers", () => {
            const message: ICommonSocketMessage = {data: "hello", timestamp: new Date()};
            service["subscribers"] = new Map<string, SocketSubscriber[]>();

            const event: Event = Event.InvalidClick;

            const subscriber: IdentificationError = new IdentificationError(service);
            if (!service["subscribers"].has(event)) {
                service["subscribers"].set(event, []);
            }
            const sub: SocketSubscriber[] = service["subscribers"].get(event) as SocketSubscriber[];
            sub.push(subscriber);

            service.notifySubsribers(event, message);
            spyOn(subscriber, "notify");

            (subscriber as SocketSubscriber).notify(event, message);
            expect(subscriber.notify).toHaveBeenCalledWith(event, message);
        });
    });

    describe("init()", () => {
        it("Should call the init method at least once", () => {
            spyOn(service, "init");
            service.init();
            expect(service.init).toHaveBeenCalled();
        });
    });

    describe("setEventListener()", () => {
        it("Should emit an event to the server", () => {
            const token: string | null = sessionStorage.getItem("token");
            const testMsg: ICommonSocketMessage = {
                // tslint:disable-next-line:no-non-null-assertion
                data: token!,
                timestamp: new Date(),
            };
            if (token) {
                spyOn(socketClient, "emit").and.callFake((event: Event, message: ICommonSocketMessage, fct: Function) => {
                    fct();
                    event = Event.Authenticate;
                    const tokendata: ICommonToken = {
                        token: token,
                    };
                    message = {
                        data: tokendata,
                        timestamp: new Date(),
                    };

                    expect(event).toEqual(Event.Authenticate);
                    expect(message.data).toEqual(testMsg.data);
                    expect(socketClient.emit).toHaveBeenCalledWith(event, message);
                });
            }
        });

        it("Should emit an event to the server", () => {
            const token: string | null = sessionStorage.getItem("token");
            if (token) {
                spyOn(socketClient, "emit").and.callFake((event: Event, message: ICommonSocketMessage, fct: Function) => {
                    fct();
                    event = Event.Authenticate;
                    const tokendata: ICommonToken = {
                        token: token,
                    };
                    message = {
                        data: tokendata,
                        timestamp: new Date(),
                    };

                    // tslint:disable-next-line:no-any
                    spyOn<any>(service, "manageServerResponse");
                    service["manageServerResponse"](message);
                    expect(service["manageServerResponse"]).toHaveBeenCalled();
                });
            }
        });
    });

    describe("manageServerResponse()", () => {
        it("Should call onAuthenticate method", () => {
            const errorResponse: ICommonError = {
                error_message: "error",
            };
            // tslint:disable-next-line:no-any
            spyOn<any>(service, "manageServerResponse").and.callFake(() => {
                spyOn(service, "onAuthenticate");
                service.onAuthenticate();
            });

            service["manageServerResponse"](errorResponse);
            expect(service.onAuthenticate).toHaveBeenCalled();
        });
    });
});
