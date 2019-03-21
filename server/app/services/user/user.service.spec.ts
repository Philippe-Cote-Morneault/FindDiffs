import {expect} from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { User } from "../../model/schemas/user";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { UserService } from "./user.service";

// tslint:disable:no-magic-numbers
describe("UserService", () => {
    const userService: UserService = new UserService();
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
        it("Should return the correct error message if input empty", async () => {
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

        it("Should return the correct error message if input length is under 3", async () => {
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
    });

    describe("delete()", () => {
        it("Should return true if the username is removed", async () => {
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

        it("Should return true if the correct error message is shown during delete", async () => {

            (User.findById as sinon.SinonStub).rejects("Not there!");

            try {
                await userService.delete("5c5636f68f786067b76d6b3e");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(idNotInDB);
            }
        });

        it("Should return the correct error message is shown when mongoose returns null for delete", async () => {

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
        it("Should be true if index is correct ", async () => {
            (User.find as sinon.SinonStub).resolves({
                username: "myname",
                creation_date: "2019-02-03T00:33:58.958Z",
                id: "5c5636f68f786067b76d6b3e",
            });
            const data: string = await userService.index();
            expect(JSON.parse(data).username).to.equal("myname");
        });
        it("Should be true if index catch error ", async () => {
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
        it("Should be true if single is correct", async () => {
            const usernameId: string = "5c5636f68f786067b76d6b3e";

            (User.findById as sinon.SinonStub).resolves({
                username: "myname",
                creation_date: "2019-02-03T00:33:58.958Z",
                id: usernameId,
            });

            const data: string = await userService.single(usernameId);
            expect(JSON.parse(data).username).to.equal("myname");
        });

        it("Should be true if single catch error", async () => {
            const usernameId: string = "5c5636f68f786067b76d6b3e";

            (User.findById as sinon.SinonStub).rejects("Not there!");

            try {
                await userService.single(usernameId);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(idNotInDB);
            }
        });

        it("Should be true if single catch error when mongoose returns null", async () => {
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

});
