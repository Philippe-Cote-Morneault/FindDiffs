import { expect } from "chai";
import { UsernameManager } from "./usernameManager";

describe("usernameManager", () => {
    let service: UsernameManager;
    beforeEach(() => {
        service = UsernameManager.getInstance();
    });
    describe("validateUsername()", () => {

        it("Should return false if the name lenth is under 3", () => {
            const username: string = "23";
            expect(service.validateUsername(username)).to.equal(false);
        });
        it("Should return false if the name lenth is over 12", () => {
            const username: string = "12345678900013";
            expect(service.validateUsername(username)).to.equal(false);
        });
        it("Should return false if the name is not alphanumeric", () => {
            const username: string = "23asj%";
            expect(service.validateUsername(username)).to.equal(false);
        });
        it("Should return true if the name lenth between 3 and 12 and alphanumeric", () => {
            const username: string = "23alpha";
            expect(service.validateUsername(username)).to.equal(true);
        });
    });

    describe("hasUsername()", () => {

        it("Should return false if the username is not known by idUsernames", () => {
            const username: string = "23";
            expect(service.hasUsername(username)).to.equal(false);
        });
        it("Should return true if the username is known by idUsernames", () => {
            const username: string = "23";
            service.addUsername("12312", username);
            expect(service.hasUsername(username)).to.equal(true);
        });
    });

    describe("addUsername()", () => {

        it("Should return true if the username is added for the first time in idUsernames", () => {
            const username: string = "234";
            service.addUsername("55555", username);
            expect(service.hasUsername(username)).to.equal(true);
        });
        it("Should return true if the username is added for a second time in idUsernames", () => {
            const username: string = "2345";
            service.addUsername("11111", username);
            service.addUsername("11111", username);
            expect(service.hasUsername(username)).to.equal(true);
        });
    });

    describe("getSocketId()", () => {

        it("Should return the correct id if the username is known by idUsernames", () => {
            const username: string = "23423";
            service.addUsername("55555", username);
            expect(service.getSocketId(username)).to.equal("55555");
        });
    });

    describe("getUsername()", () => {

        it("Should return the correct username if the socket is known by idUsernames", () => {
            const username: string = "2340394";
            service.addUsername("55555", username);
            expect(service.getUsername("55555")).to.equal(username);
        });
        it("Should return undefined if the socket is not known by idUsernames", () => {
            expect(service.getUsername("mamamiya")).to.equal(undefined);
        });
    });

    describe("removeUsername()", () => {

        it("Should return and delete the correct username if the socket is known by idUsernames", () => {
            const username: string = "2340394";
            service.addUsername("55555", username);
            expect(service.removeUsername("55555")).to.equal(username);
            expect(service.hasUsername(username)).to.equal(false);
        });

        it("Should return undefined if the socket is not known by idUsernames", () => {

            expect(service.removeUsername("bamboozled")).to.equal(undefined);
        });
    });
});
