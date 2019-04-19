import { expect } from "chai";
import * as http from "http";
import * as sinon from "sinon";
import * as socketIo from "socket.io";
import * as socketIoClient from "socket.io-client";
import * as Mockito from "ts-mockito";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { R } from "../../strings";
import { AuthentificationService } from "./authentificationService";
import { SocketHandler } from "./socketHandler";

// tslint:disable-next-line:max-func-body-length
describe("AuthentificationService", () => {
    const authentificationService: AuthentificationService = AuthentificationService.getInstance();
    let socketHandler: SocketHandler;
    let clientSocket: SocketIOClient.Socket;
    let socket1: socketIo.Socket;
    let server: http.Server;

    before((done: MochaDone) => {
        const express = require("express");
        server = http.createServer(express);
        server.listen(3030);
        socketHandler = SocketHandler.getInstance();
        socketHandler["io"] = socketIo(server);
        socketHandler["io"].on("connect", (socket: socketIo.Socket) => {
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
        it("Should return a GameService instance", () => {
            const instance: AuthentificationService = AuthentificationService.getInstance();
            expect(instance).to.be.an.instanceOf(AuthentificationService);
        });

        it("Should return the same GameService instance", () => {
            const instance1: AuthentificationService = AuthentificationService.getInstance();
            const instance2: AuthentificationService = AuthentificationService.getInstance();
            expect(instance1).to.equal(instance2);
        });
    });

    describe("startCleanupTimer()", () => {
        const socket: SocketIO.Socket = Mockito.mock(socketIo);

        it("Should have called startCleanupTimer with the right arguments", () => {
            const spy: sinon.SinonSpy = sinon.spy(authentificationService, "startCleanupTimer");
            authentificationService.startCleanupTimer(socket);
            expect(spy.calledOnceWithExactly(socket)).to.equal(true);
            spy.restore();
        });
    });
    describe("authenticateUser", () => {
        const successCallback: (newUsername: string) => void = (newUsername: string) => {};

        it("Should set an event listener on the Authenticate event", () => {
            const socketOnStub: sinon.SinonSpy = sinon.spy(socket1, "on");
            authentificationService.authenticateUser(socket1, successCallback);
            expect(socketOnStub.firstCall.args[0]).to.equal(Event.Authenticate);
            socketOnStub.restore();
        });
        it("Should set an event listener on the NewUser event", () => {
            const socketOnStub: sinon.SinonSpy = sinon.spy(socket1, "on");
            authentificationService.authenticateUser(socket1, successCallback);
            expect(socketOnStub.secondCall.args[0]).to.equal(Event.NewUser);
            socketOnStub.restore();
        });
        it("Should send an ErrorToken error in the response callback if the user authentification is invaid", () => {
            const message: ICommonSocketMessage = {
                data: {
                    token: "1234",
                },
                timestamp: new Date(),
            };
            const response: sinon.SinonSpy = sinon.fake();
            socket1.listeners(Event.Authenticate)[0](message, response);
            expect(response.firstCall.args[0].error_message).to.equal(R.ERROR_TOKEN);
        });
        it("Should send the username of the user that already existed if there was an already existing username", () => {
            authentificationService["authentifiedUsers"].clear();
            authentificationService["authentifiedUsers"].set("1234", "player1");
            authentificationService["activeCleanupTimers"].clear();
            authentificationService["activeCleanupTimers"].set("1234", setTimeout(() => {}, 1000000));

            const addUsernameStub: sinon.SinonStub = sinon.stub(authentificationService["usernameManager"], "addUsername");
            const message: ICommonSocketMessage = {
                data: {
                    token: "1234",
                },
                timestamp: new Date(),
            };
            const response: sinon.SinonSpy = sinon.fake();

            socket1.listeners(Event.Authenticate)[0](message, response);
            expect(response.firstCall.args[0].username).to.equal("player1");
            addUsernameStub.restore();
        });
    });

    describe("newUser", () => {
        it("Should return an object with error_message as Failed to create", () => {
            const validateUsernameStub: sinon.SinonStub = sinon.stub(authentificationService["usernameManager"], "validateUsername");
            validateUsernameStub.returns(false);

            const result: Object = authentificationService["newUser"]("player1", socket1, (newUsername: string) => {});

            expect(result["error_message"]).to.equal("failed to create");
            validateUsernameStub.restore();
        });
        it("Should return the same token as the one created by sendValidationToken if this is a valid username", () => {
            authentificationService["authentifiedUsers"].set("somerandomtoken", "oldUsername");
            const validateUsernameStub: sinon.SinonStub = sinon.stub(authentificationService["usernameManager"], "validateUsername");
            validateUsernameStub.returns(true);
            const getUsernameStub: sinon.SinonStub = sinon.stub(authentificationService["usernameManager"], "getUsername");
            getUsernameStub.returns("oldUsername");
            const addUsernameStub: sinon.SinonStub = sinon.stub(authentificationService["usernameManager"], "addUsername");
            const sendValidationSpy: sinon.SinonSpy = sinon.spy(authentificationService, "sendValidationToken" as any);
            const result: Object = authentificationService["newUser"]("player1", socket1, (newUsername: string) => {});

            expect(result["token"]).to.equal(sendValidationSpy.firstCall.returnValue);
            validateUsernameStub.restore();
            getUsernameStub.restore();
            addUsernameStub.restore();
            sendValidationSpy.restore();
        });
    });
});
