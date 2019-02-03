import {expect} from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { User } from "../../model/schemas/user";
import { UserService } from "./user.service";

// tslint:disable:no-magic-numbers
describe("UserService", () => {
    const userService: UserService = new UserService();
    const notSetError: string = "The field username is not set.";
    const notValidError: string = "The field username is not valid.";
    const alreadyTakenError: string = "The username is already taken.";
    const sucessDelete: string = "The user was deleted.";
    const idNotInDB: string = "The id could not be found";

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

    it("Should return the correct error message if input empty", async () => {
        const request: Object = {
            body: { username : "", },
        };
        try {
            await userService.post(mockReq(request));
            throw new Error("No error thrown by service");
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
            throw new Error("No error thrown by service");
        } catch (err) {
            expect(err.message).to.equal(notValidError);
        }
    });

    it("Should return the correct error message if input length is over 12", async () => {
        const request: Object = {
            body: { username : "aaaaaaaaaaaaa", },
        };
        try {
            await userService.post(mockReq(request));
            throw new Error("No error thrown by service");
        } catch (err) {
            expect(err.message).to.equal(notValidError);
        }
    });

    it("Should return the correct error message if the input is not alphanumeric", async () => {
        const request: Object = {
            body: { username : "-+-=", },
        };
        try {
            await userService.post(mockReq(request));
            throw new Error("No error thrown by service");
        } catch (err) {
            expect(err.message).to.equal(notValidError);
        }
    });

    it("Should return the correct message if input length is between 3 and 12", async () => {
        const testUsername: string = "michel6";
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

    it("Should return the correct message if the input is alpha", async () => {
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

    it("Should return the correct message if the input is numeric", async () => {
        const testUsername: string = "123456789";
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

    it("Should return the correct error message if the input is already taken", async () => {
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
            throw new Error("No error thrown by service");
        } catch (err) {
            expect(err.message).to.equal(alreadyTakenError);
        }

    });

    // deleteUsername
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
            throw new Error("No error thrown by service");
        } catch (err) {
            expect(err.message).to.equal(idNotInDB);
        }
    });
    // index
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
            throw new Error("No error thrown by service");
        } catch (err) {
            // The error message is empty
            expect(err.message).to.equal("");
        }
    });
    // single
    it("Should be true if single correct", async () => {
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
            throw new Error("No error thrown by service");
        } catch (err) {
            expect(err.message).to.equal(idNotInDB);
        }
    });
});
