import { expect } from "chai";
import * as http from "http";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { SocketCallback } from "./socketCallback";
import { SocketHandler } from "./socketHandler";

describe("SocketHandler", () => {
    describe("getInstance()", () => {
        it("Should return an instance of SocketHandler when getting an instance", () => {
            const instance: SocketHandler = SocketHandler.getInstance();
            expect(instance).to.be.an.instanceOf(SocketHandler);
        });

        it("Should return the same SocketHandler instance", () => {
            const instance1: SocketHandler = SocketHandler.getInstance();
            const instance2: SocketHandler = SocketHandler.getInstance();
            expect(instance1).to.equal(instance2);
        });
    });

    describe("setServer()", () => {
        it("Should return the same instance of SocketHandler after setting a server", () => {
            const server: http.Server = http.createServer();
            const socketHandler: SocketHandler = SocketHandler.getInstance();
            expect(SocketHandler.getInstance().setServer(server)).to.equal(socketHandler);
        });
    });

    describe("subscribe()", () => {
        it("Subscribing to an event should add the callback to the list of subsribers", () => {
            const socketHandler: SocketHandler = SocketHandler.getInstance();
            // tslint:disable-next-line:no-empty
            const callback: SocketCallback = (message: ICommonSocketMessage, sender: string) => {};
            socketHandler.subscribe(Event.UserConnected, callback);
            expect((socketHandler["subscribers"].get(Event.UserConnected) as SocketCallback[]).indexOf(callback)).to.not.equal(-1);
        });
    });
});
