import { expect } from "chai";
import * as sinon from "sinon";
import SocketIO = require("socket.io");
import * as Mockito from "ts-mockito";
import { AuthentificationService } from "./authentificationService";

describe("AuthentificationService", () => {

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
        const authentificationService: AuthentificationService = AuthentificationService.getInstance();
        const socket: SocketIO.Socket = Mockito.mock(SocketIO);

        it("Should have called startCleanupTimer with the right arguments", () => {
            const spy: sinon.SinonSpy = sinon.spy(authentificationService, "startCleanupTimer");
            authentificationService.startCleanupTimer(socket);
            expect(spy.calledOnceWithExactly(socket)).to.equal(true);
            spy.restore();
        });
    });
});
