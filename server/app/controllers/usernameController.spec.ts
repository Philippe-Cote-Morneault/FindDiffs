import {expect} from "chai";
import { mockReq, mockRes } from "sinon-express-mock";
import { UsernameController } from "./usernameController";

/* tslint:disable:no-magic-numbers */

describe("InitialViewService", () => {
  const usernameController: UsernameController = new UsernameController();

  // isEmpty
  it("Should be true if input empty", () => {
    const emptyString: string = "";
    expect(usernameController.isEmpty(emptyString)).to.equal(true);
  });
  it("Should be false if input is not empty", () => {
    const notEmptyString: string = "notEmpty";
    expect(usernameController.isEmpty(notEmptyString)).to.equal(false);
  });

  // isCorrectLength
  it("Should be false if input length is under 3", () => {
    const notEmptyString: string = "12";
    expect(usernameController.isCorrectLength(notEmptyString)).to.equal(false);
  });
  it("Should be false if input length is over 12", () => {
    const notEmptyString: string = "12345678910111213";
    expect(usernameController.isCorrectLength(notEmptyString)).to.equal(false);
  });
  it("Should be true if input length is between 3 and 12", () => {
    const notEmptyString: string = "1234567";
    expect(usernameController.isCorrectLength(notEmptyString)).to.equal(true);
  });

  // isAlpha
  it("Should be true if input is alpha", () => {
    const notEmptyString: string = "a";
    expect(usernameController.isAlpha(notEmptyString)).to.equal(true);
  });
  it("Should be false if input is numeric", () => {
    const notEmptyString: string = "6";
    expect(usernameController.isAlpha(notEmptyString)).to.equal(false);
  });
  it("Should be false if input is not alpha or numeric", () => {
    const notEmptyString: string = "%";
    expect(usernameController.isAlpha(notEmptyString)).to.equal(false);
  });

  // isNumeric
  it("Should be false if input is alpha", () => {
    const notEmptyString: string = "a";
    expect(usernameController.isNumeric(notEmptyString)).to.equal(false);
  });
  it("Should be true if input is numeric", () => {
    const notEmptyString: string = "6";
    expect(usernameController.isNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be false if input is not alpha or numeric", () => {
    const notEmptyString: string = "%";
    expect(usernameController.isNumeric(notEmptyString)).to.equal(false);
  });

  // isAlphaNumeric
  it("Should be true if input contains only alpha", () => {
    const notEmptyString: string = "abcdefg";
    expect(usernameController.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be true if input contains only numeric", () => {
    const notEmptyString: string = "123456";
    expect(usernameController.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be true if input contains alpha and numeric", () => {
    const notEmptyString: string = "a1b2c3d4";
    expect(usernameController.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be false if input contains unsupported symbols", () => {
    const notEmptyString: string = "a1b2$c3d";
    expect(usernameController.isAlphaNumeric(notEmptyString)).to.equal(false);
  });
  it("Should be false if input is an unsupported symbols", () => {
    const notEmptyString: string = "!";
    expect(usernameController.isAlphaNumeric(notEmptyString)).to.equal(false);
  });

  // isArrayEmpty
  it("Should be true if the array is empty", () => {
    const emptyArray: string[] = [];
    expect(usernameController.isArrayEmpty(emptyArray)).to.equal(true);
  });
  it("Should be false if the array is not empty", () => {
    const notEmptyArray: string[] = ["Jack o' Lantern"];
    expect(usernameController.isArrayEmpty(notEmptyArray)).to.equal(false);
  });
  it("Should be false if the array is not empty", () => {
    const notEmptyArray: string[] = ["5", "6", "bonsoir"];
    expect(usernameController.isArrayEmpty(notEmptyArray)).to.equal(false);
  });

  // add
  it("Should be false if the array is not empty after add function", () => {
    const notEmptyArray: string[] = [];
    usernameController.add("username", notEmptyArray);
    expect(usernameController.isArrayEmpty(notEmptyArray)).to.equal(false);
  });
  it("Should be true if the username corresponds to the added username", () => {
    const notEmptyArray: string[] = [];
    usernameController.add("username", notEmptyArray);
    expect(notEmptyArray[0]).to.equal("username");
  });
  it("Should be true if the length of the array corresponds to the number of added username", () => {
    const notEmptyArray: string[] = [];
    usernameController.add("username1", notEmptyArray);
    usernameController.add("username2", notEmptyArray);
    usernameController.add("username3", notEmptyArray);
    expect(notEmptyArray.length).to.equal(3);
  });

  // isAvailable
  it("Should be true if the array is empty", () => {
    const emptyArray: string[] = [];
    expect(usernameController.isAvailable("username", emptyArray)).to.equal(true);
  });
  it("Should be true if the username is not in the array", () => {
    const notEmptyArray: string[] = [];
    usernameController.add("username1", notEmptyArray);
    usernameController.add("username2", notEmptyArray);
    usernameController.add("username3", notEmptyArray);
    expect(usernameController.isAvailable("username4", notEmptyArray)).to.equal(true);
  });
  it("Should be false if the username is in the array", () => {
    const notEmptyArray: string[] = [];
    usernameController.add("username", notEmptyArray);
    expect(usernameController.isAvailable("username", notEmptyArray)).to.equal(false);
  });
  it("Should be false if the username is in the array and the array has multiple usernames", () => {
    const notEmptyArray: string[] = [];
    usernameController.add("username1", notEmptyArray);
    usernameController.add("username2", notEmptyArray);
    usernameController.add("username3", notEmptyArray);
    expect(usernameController.isAvailable("username3", notEmptyArray)).to.equal(false);
  });
  // verifyUsername
  // tslint:disable:typedef
  it("Should be true if the username (ALPHA) is corretly added when the array is empty", () => {
    const user: string = "username";
    const request = {
      params: { username : "username", },
    };
    const response = {
      body: { },
    };
    usernameController.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameController.usernameArray[0]).to.equal(user);
    usernameController.deleteUsername(mockReq(request));
  });
  it("Should be true if the username (NUMERIC) is corretly added when the array is empty", () => {
    const user: string = "1234";
    const request = {
      params: { username : "1234", },
    };
    const response = {
      body: { },
    };
    usernameController.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameController.usernameArray[0]).to.equal(user);
    usernameController.deleteUsername(mockReq(request));
  });
  it("Should be true if the username (ALPHANUMERIC) is corretly added when the array is empty", () => {
    const user: string = "username12";
    const request = {
      params: { username : "username12", },
    };
    const response = {
      body: { },
    };
    usernameController.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameController.usernameArray[0]).to.equal(user);
    usernameController.deleteUsername(mockReq(request));
  });
  it("Should be true if the username is not added: name too short", () => {
    const request = {
      params: { username : "us", },
    };
    const response = {
      body: { },
    };
    usernameController.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameController.usernameArray.length).to.equal(0);
  });
  it("Should be true if the username is not added: name too long", () => {
    const request = {
      params: { username : "username1234567", },
    };
    const response = {
      body: { },
    };
    usernameController.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameController.usernameArray.length).to.equal(0);
  });
  it("Should be true if multiple differents usernames are added", () => {
    const firstRequest = {
      params: { username : "username1", },
    };
    const secondRequest = {
      params: { username : "username2", },
    };
    const thirdRequest = {
      params: { username : "username3", },
    };
    const response = {
      body: { },
    };
    usernameController.verifyUsername(mockReq(firstRequest), mockRes(response));
    usernameController.verifyUsername(mockReq(secondRequest), mockRes(response));
    usernameController.verifyUsername(mockReq(thirdRequest), mockRes(response));
    expect(usernameController.usernameArray.length).to.equal(3);
    expect(usernameController.usernameArray[0]).to.equal("username1");
    expect(usernameController.usernameArray[1]).to.equal("username2");
    expect(usernameController.usernameArray[2]).to.equal("username3");
    usernameController.deleteUsername(mockReq(firstRequest));
    usernameController.deleteUsername(mockReq(secondRequest));
    usernameController.deleteUsername(mockReq(thirdRequest));
  });
  it("Should be true if two identical usernames are added", () => {
    const request = {
      params: { username : "username", },
    };
    const response = {
      body: { },
    };
    usernameController.verifyUsername(mockReq(request), mockRes(response));
    usernameController.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameController.usernameArray.length).to.equal(1);
    expect(usernameController.usernameArray[0]).to.equal("username");
    usernameController.deleteUsername(mockReq(request));
  });
  // deleteUsername
  it("Should return true if the username is removed from the array", () => {
    const request = {
      params: { username: "bob", },
    };
    const response = {
      body: { },
    };
    usernameController.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameController.usernameArray.length).to.equal(1);
    usernameController.deleteUsername(mockReq(request));
    expect(usernameController.usernameArray.length).to.equal(0);
  });
});
