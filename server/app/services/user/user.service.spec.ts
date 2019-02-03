// import { doesNotReject } from "assert";
import {expect} from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { User } from "../../model/schemas/user";
import { UserService } from "./user.service";

// tslint:disable:no-magic-numbers
// tslint:disable:typedef
describe("UserService", () => {
    const userService: UserService = new UserService();
    const notSetError: string = "The field username is not set.";
    const notValidError: string = "The field username is not valid.";
    const alreadyTakenError: string = "The username is already taken.";
    const sucessDelete: string = '{"title":"Sucess","body":"The user was deleted."}';

    beforeEach(() => {
        sinon.stub(User, "find");
        sinon.stub(User.prototype, "save");
        sinon.stub(User, "countDocuments");
    });

    afterEach(() => {
        (User.find as sinon.SinonStub).restore();
        (User.countDocuments as sinon.SinonStub).restore();
        (User.prototype.save as sinon.SinonStub).restore();

    });

    it("Should return the correct error message if input empty", async () => {
        const request = {
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
        const request = {
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
        const request = {
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
        const request = {
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
        const request = {
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
        const request = {
            body: { username : "", },
        };
        const data: string = await userService.post(mockReq(request));
        expect(data).to.equal("abcde");
    });

    it("Should return the correct message if the input is numeric", async () => {
        const request = {
            body: { username : "", },
        };
        const data: string = await userService.post(mockReq(request));
        expect(data).to.equal("12345");
    });

    it("Should return the correct error message if the input is already taken", async () => {
        const request = {
            body: { username : "", },
        };
        await userService.post(mockReq(request));
        const data: string = await userService.post(mockReq(request));
        expect(data).to.equal(alreadyTakenError);
    });

    // deleteUsername
    it("Should return true if the username is removed", async () => {
        const request = {
            body: { username : "", },
        };
        await userService.post(mockReq(request));
        const data: string = await userService.delete("");
        expect(data).to.equal(sucessDelete);
    });

    it("Should return true if the correct error message is shown during delete", async () => {
        const request = {
            body: { username : "", },
        };
        await userService.post(mockReq(request));
        // Doesnt delete an existing user
        const data: string = await userService.delete("");
        expect(data).to.equal("something");
    });
});
