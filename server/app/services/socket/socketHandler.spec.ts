import { expect } from "chai";
import * as http from "http";
import * as sinon from "sinon";
import * as socketIo from "socket.io";
import * as socketIoClient from "socket.io-client";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { SocketCallback } from "./socketCallback";
import { SocketHandler } from "./socketHandler";
import { UsernameManager } from "./usernameManager";

describe("SocketHandler", () => {
    let socketHandler: SocketHandler;
    const usernameManager: UsernameManager = UsernameManager.getInstance();
    let clientSocket: SocketIOClient.Socket;
    let socket1: socketIo.Socket;
    let server: http.Server;

    
    before((done: MochaDone) => {
        const express = require("express");
        server = http.createServer(express);
        server.listen(3030);
        socketHandler = SocketHandler.getInstance();
        socketHandler["io"] = socketIo(server);
        socketHandler["io"].on("connect", (socket : socketIo.Socket) => {
            socket1 = socket;
            done();
        });
        clientSocket = socketIoClient.connect("http://localhost:3030");
    });

    after(() => {
        clientSocket.close();
        socketHandler["io"].close();
        server.close();
    });

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
            expect(SocketHandler.getInstance().setServer(server)).to.equal(socketHandler);
        });
    });

    describe("subscribe()", () => {
        it("Subscribing to an event should add the callback to the list of subsribers", () => {
            // tslint:disable-next-line:no-empty
            const callback: SocketCallback = (message: ICommonSocketMessage, sender: string) => {};
            socketHandler.subscribe(Event.UserConnected, callback);
            expect((socketHandler["subscribers"].get(Event.UserConnected) as SocketCallback[]).indexOf(callback)).to.not.equal(-1);
        });
    });

    describe("sendMessage()", () => {
        it("Should send a message with the event and message passed in parameters", () => {
            const spy: sinon.SinonSpy<[string], SocketIO.Namespace> = sinon.spy(socketHandler["io"], "to");
            const message: ICommonSocketMessage = {
                data: "test",
                timestamp: new Date(),
            };
            usernameManager.addUsername("1234asdf", "phil");
            socketHandler.sendMessage(Event.Authenticate, message, "phil");
            // tslint:disable-next-line:no-unused-expression
            expect(spy.calledOnce).to.be.true;
            spy.restore();
        });

        it("Should send a message to the socket associated with the username passed as an argument", () => {
            const spy: sinon.SinonSpy<[string], SocketIO.Namespace> = sinon.spy(socketHandler["io"], "to");
            const message: ICommonSocketMessage = {
                data: "test",
                timestamp: new Date(),
            };
            usernameManager.addUsername("1234asdf", "phil");
            socketHandler.sendMessage(Event.Authenticate, message, "phil");
            expect(spy.getCalls()[0].args[0]).to.equal("1234asdf");
            spy.restore();
        });
    });

    describe("broadcastMessage()", () => {
        it("Should broadcast a message to all sockets with the event passed as an argument", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy<[string | symbol, ...any[]], boolean> = sinon.spy(socketHandler["io"].sockets, "emit");
            const message: ICommonSocketMessage = {
                data: "test123",
                timestamp: new Date(),
            };

            socketHandler.broadcastMessage(Event.Authenticate, message);
            expect(spy.getCalls()[0].args[0]).to.equal(Event.Authenticate);
            spy.restore();
        });
        it("Should broadcast a message to all sockets with the message passed as an argument", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy<[string | symbol, ...any[]], boolean> = sinon.spy(socketHandler["io"].sockets, "emit");
            const message: ICommonSocketMessage = {
                data: "test123",
                timestamp: new Date(),
            };

            socketHandler.broadcastMessage(Event.Authenticate, message);
            expect(spy.getCalls()[0].args[1]).to.equal(message);
            spy.restore();
        });
    });

    describe("authenticateUser()", () => {
        it("Should call AuthentificationService::authenticateUser() once", () => {
            const spy = sinon.spy(socketHandler["authentificationService"], "authenticateUser");
            socketHandler["authenticateUser"](socket1);
            // tslint:disable-next-line:no-unused-expression
            expect(spy.calledOnce).to.be.true;
            spy.restore();
        });
    });
});
