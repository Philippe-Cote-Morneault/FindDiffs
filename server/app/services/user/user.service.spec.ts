/*
import {expect} from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { User } from "../../model/schemas/user";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { UsernameValidator } from "./usernameValidator";

// tslint:disable:no-magic-numbers
describe("UserService", () => {
    const userService: UsernameValidator = new UsernameValidator();
    const notSetError: string = "The field username is not present.";
    const notValidError: string = "The username is invalid, it must be between 3 and 12 alpha numeric characters.";
    const alreadyTakenError: string = "The username is already taken.";
    const sucessDelete: string = "The user was deleted.";
    const idNotInDB: string = "The id could not be found.";

    beforeEach(() => {
        sinon.stub(User, "find");
        sinon.stub(User.prototype, "save");
        sinon.stub(User.prototype, "remove");
        sinon.stub(User, "countDocuments");
        sinon.stub(User, "findById");
    });

    afterEach(() => {
        (User.find as sinon.SinonStub).restore();
        (User.countDocuments as sinon.SinonStub).restore();
        (User.prototype.save as sinon.SinonStub).restore();
        (User.prototype.remove as sinon.SinonStub).restore();
        (User.findById as sinon.SinonStub).restore();
    });

    describe("post()", () => {
        it("Should throw an error if the input is empty", async () => {
            const request: Object = {
                body: { username : "", },
            };
            try {
                await userService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(notSetError);
            }
        });
        it("Should throw an error if the username is invalid", async () => {
            const request: Object = {
                body: { username : "ab", },
            };
            try {
                await userService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(notValidError);
            }
        });

        it("Should throw an error if the input is already taken by an other user", async () => {
            const testUsername: string = "123456789";
            const request: Object = {
                body: { username : testUsername, },
            };
            (User.prototype.save as sinon.SinonStub).resolves({
                username: testUsername,
                creation_date: "2019-02-03T00:33:58.958Z",
                id: "5c5636f68f786067b76d6b3e",
            });
            (User.countDocuments as sinon.SinonStub).resolves(1);

            try {
                await userService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(alreadyTakenError);
            }
        });

        it("Should regsister the user if its name is valid", async () => {
            const testUsername: string = "MonNomCGab";
            const request: Object = {
                body: { username : testUsername, },
            };
            (User.prototype.save as sinon.SinonStub).resolves({
                username: testUsername,
                creation_date: "2019-02-03T00:33:58.958Z",
                id: "5c5636f68f786067b76d6b3e",
            });
            (User.countDocuments as sinon.SinonStub).resolves(0);

            const data: string = await userService.post(mockReq(request));
            expect(JSON.parse(data).username).to.equal(testUsername);
        });

    });

    describe("delete()", () => {
        it("Should be able to remove a user properly when the id is present in the server", async () => {
            const usernameId: string = "5c5636f68f786067b76d6b3e";

            (User.findById as sinon.SinonStub).resolves({
                username: "myname",
                creation_date: "2019-02-03T00:33:58.958Z",
                id: usernameId,
                remove: () => {
                    return "a";
                },
            });
            (User.prototype.remove as sinon.SinonStub).resolves({});

            const data: string = await userService.delete(usernameId);
            expect(JSON.parse(data).body).to.equal(sucessDelete);
        });

        it("Should throw an error if the id is not present in the server", async () => {

            (User.findById as sinon.SinonStub).rejects("Not there!");

            try {
                await userService.delete("5c5636f68f786067b76d6b3e");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(idNotInDB);
            }
        });

        it("Should throw an error if the id is not present in the server and is marked as undefined", async () => {

            (User.findById as sinon.SinonStub).resolves(undefined);

            try {
                await userService.delete("5c5636f68f786067b76d6b3e");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(idNotInDB);
            }
        });

    });

    describe("index()", () => {
        it("Should list all the users that are currently connected to the server", async () => {
            (User.find as sinon.SinonStub).resolves({
                username: "myname",
                creation_date: "2019-02-03T00:33:58.958Z",
                id: "5c5636f68f786067b76d6b3e",
            });
            const data: string = await userService.index();
            expect(JSON.parse(data).username).to.equal("myname");
        });
        it("Should throw an error if the server was not able to list all the users in the database", async () => {
            (User.find as sinon.SinonStub).rejects("Not there!");

            try {
                await userService.index();
                throw new NoErrorThrownException();
            } catch (err) {
                // The error message is empty
                expect(err.message).to.equal("");
            }
        });
    });

    describe("single()", () => {
        it("Should list the user associated with it's id", async () => {
            const usernameId: string = "5c5636f68f786067b76d6b3e";

            (User.findById as sinon.SinonStub).resolves({
                username: "myname",
                creation_date: "2019-02-03T00:33:58.958Z",
                id: usernameId,
            });

            const data: string = await userService.single(usernameId);
            expect(JSON.parse(data).username).to.equal("myname");
        });

        it("Should throw an error if the user id is not present in the server", async () => {
            const usernameId: string = "5c5636f68f786067b76d6b3e";

            (User.findById as sinon.SinonStub).rejects("Not there!");

            try {
                await userService.single(usernameId);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(idNotInDB);
            }
        });

        it("Should throw an error if the user id is not present in the server but is undefined", async () => {
            const usernameId: string = "5c5636f68f786067b76d6b3e";

            (User.findById as sinon.SinonStub).resolves(undefined);

            try {
                await userService.single(usernameId);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(idNotInDB);
            }
        });
    });

});*/
