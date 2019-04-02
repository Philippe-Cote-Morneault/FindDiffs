import { expect } from "chai";
import * as http from "http";
import * as sinon from "sinon";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { SocketCallback } from "./socketCallback";
import { SocketHandler } from "./socketHandler";
import { UsernameManager } from "./usernameManager";

describe("SocketHandler", () => {
    const socketHander: SocketHandler = SocketHandler.getInstance();
    const usernameManager: UsernameManager = UsernameManager.getInstance();

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

    describe("sendMessage()", () => {
        it("Should send a message with the event and message passed in parameters", () => {
            const spy: sinon.SinonSpy<[string], SocketIO.Namespace> = sinon.spy(socketHander["io"], "to");
            const message: ICommonSocketMessage = {
                data: "test",
                timestamp: new Date(),
            };
            usernameManager.addUsername("1234asdf", "phil");
            socketHander.sendMessage(Event.Authenticate, message, "phil");
            // tslint:disable-next-line:no-unused-expression
            expect(spy.calledOnce).to.be.true;
            spy.restore();
        });

        it("Should send a message to the socket associated with the username passed as an argument", () => {
            const spy: sinon.SinonSpy<[string], SocketIO.Namespace> = sinon.spy(socketHander["io"], "to");
            const message: ICommonSocketMessage = {
                data: "test",
                timestamp: new Date(),
            };
            usernameManager.addUsername("1234asdf", "phil");
            socketHander.sendMessage(Event.Authenticate, message, "phil");
            expect(spy.getCalls()[0].args[0]).to.equal("1234asdf");
            spy.restore();
        });
    });

    describe("broadcastMessage()", () => {
        it("Should broadcast a message to all sockets with the event passed as an argument", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy<[string | symbol, ...any[]], boolean> = sinon.spy(socketHander["io"].sockets, "emit");
            const message: ICommonSocketMessage = {
                data: "test123",
                timestamp: new Date(),
            };

            socketHander.broadcastMessage(Event.Authenticate, message);
            expect(spy.getCalls()[0].args[0]).to.equal(Event.Authenticate);
            spy.restore();
        });
        it("Should broadcast a message to all sockets with the message passed as an argument", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy<[string | symbol, ...any[]], boolean> = sinon.spy(socketHander["io"].sockets, "emit");
            const message: ICommonSocketMessage = {
                data: "test123",
                timestamp: new Date(),
            };

            socketHander.broadcastMessage(Event.Authenticate, message);
            expect(spy.getCalls()[0].args[1]).to.equal(message);
            spy.restore();
        });
    });
});
