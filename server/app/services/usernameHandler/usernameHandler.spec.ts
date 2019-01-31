import {expect} from "chai";
import { mockReq, mockRes } from "sinon-express-mock";
import { UsernameHandler } from "./usernameHandler.service";

/* tslint:disable:no-magic-numbers */

describe("usernameHandler", () => {
  const usernameHandler: UsernameHandler = new UsernameHandler();

  // isEmpty
  it("Should be true if input empty", () => {
    const emptyString: string = "";
    expect(usernameHandler.isEmpty(emptyString)).to.equal(true);
  });
  it("Should be false if input is not empty", () => {
    const notEmptyString: string = "notEmpty";
    expect(usernameHandler.isEmpty(notEmptyString)).to.equal(false);
  });

  // isCorrectLength
  it("Should be false if input length is under 3", () => {
    const notEmptyString: string = "12";
    expect(usernameHandler.isCorrectLength(notEmptyString)).to.equal(false);
  });
  it("Should be false if input length is over 12", () => {
    const notEmptyString: string = "12345678910111213";
    expect(usernameHandler.isCorrectLength(notEmptyString)).to.equal(false);
  });
  it("Should be true if input length is between 3 and 12", () => {
    const notEmptyString: string = "1234567";
    expect(usernameHandler.isCorrectLength(notEmptyString)).to.equal(true);
  });

  // isAlpha
  it("Should be true if input is alpha", () => {
    const notEmptyString: string = "a";
    expect(usernameHandler.isAlpha(notEmptyString)).to.equal(true);
  });
  it("Should be false if input is numeric", () => {
    const notEmptyString: string = "6";
    expect(usernameHandler.isAlpha(notEmptyString)).to.equal(false);
  });
  it("Should be false if input is not alpha or numeric", () => {
    const notEmptyString: string = "%";
    expect(usernameHandler.isAlpha(notEmptyString)).to.equal(false);
  });

  // isNumeric
  it("Should be false if input is alpha", () => {
    const notEmptyString: string = "a";
    expect(usernameHandler.isNumeric(notEmptyString)).to.equal(false);
  });
  it("Should be true if input is numeric", () => {
    const notEmptyString: string = "6";
    expect(usernameHandler.isNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be false if input is not alpha or numeric", () => {
    const notEmptyString: string = "%";
    expect(usernameHandler.isNumeric(notEmptyString)).to.equal(false);
  });

  // isAlphaNumeric
  it("Should be true if input contains only alpha", () => {
    const notEmptyString: string = "abcdefg";
    expect(usernameHandler.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be true if input contains only numeric", () => {
    const notEmptyString: string = "123456";
    expect(usernameHandler.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be true if input contains alpha and numeric", () => {
    const notEmptyString: string = "a1b2c3d4";
    expect(usernameHandler.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be false if input contains unsupported symbols", () => {
    const notEmptyString: string = "a1b2$c3d";
    expect(usernameHandler.isAlphaNumeric(notEmptyString)).to.equal(false);
  });
  it("Should be false if input is an unsupported symbols", () => {
    const notEmptyString: string = "!";
    expect(usernameHandler.isAlphaNumeric(notEmptyString)).to.equal(false);
  });

  // isArrayEmpty
  it("Should be true if the array is empty", () => {
    const emptyArray: string[] = [];
    expect(usernameHandler.isArrayEmpty(emptyArray)).to.equal(true);
  });
  it("Should be false if the array is not empty", () => {
    const notEmptyArray: string[] = ["Jack o' Lantern"];
    expect(usernameHandler.isArrayEmpty(notEmptyArray)).to.equal(false);
  });
  it("Should be false if the array is not empty", () => {
    const notEmptyArray: string[] = ["5", "6", "bonsoir"];
    expect(usernameHandler.isArrayEmpty(notEmptyArray)).to.equal(false);
  });

  // add
  it("Should be false if the array is not empty after add function", () => {
    const notEmptyArray: string[] = [];
    usernameHandler.add("username", notEmptyArray);
    expect(usernameHandler.isArrayEmpty(notEmptyArray)).to.equal(false);
  });
  it("Should be true if the username corresponds to the added username", () => {
    const notEmptyArray: string[] = [];
    usernameHandler.add("username", notEmptyArray);
    expect(notEmptyArray[0]).to.equal("username");
  });
  it("Should be true if the length of the array corresponds to the number of added username", () => {
    const notEmptyArray: string[] = [];
    usernameHandler.add("username1", notEmptyArray);
    usernameHandler.add("username2", notEmptyArray);
    usernameHandler.add("username3", notEmptyArray);
    expect(notEmptyArray.length).to.equal(3);
  });

  // isAvailable
  it("Should be true if the array is empty", () => {
    const emptyArray: string[] = [];
    expect(usernameHandler.isAvailable("username", emptyArray)).to.equal(true);
  });
  it("Should be true if the username is not in the array", () => {
    const notEmptyArray: string[] = [];
    usernameHandler.add("username1", notEmptyArray);
    usernameHandler.add("username2", notEmptyArray);
    usernameHandler.add("username3", notEmptyArray);
    expect(usernameHandler.isAvailable("username4", notEmptyArray)).to.equal(true);
  });
  it("Should be false if the username is in the array", () => {
    const notEmptyArray: string[] = [];
    usernameHandler.add("username", notEmptyArray);
    expect(usernameHandler.isAvailable("username", notEmptyArray)).to.equal(false);
  });
  it("Should be false if the username is in the array and the array has multiple usernames", () => {
    const notEmptyArray: string[] = [];
    usernameHandler.add("username1", notEmptyArray);
    usernameHandler.add("username2", notEmptyArray);
    usernameHandler.add("username3", notEmptyArray);
    expect(usernameHandler.isAvailable("username3", notEmptyArray)).to.equal(false);
  });
  // verifyUsername
  // tslint:disable:typedef
  it("Should be true if the username is empty", () => {
    const user: string = "username";
    const request = {
      params: { username : "username", },
    };
    const response = {
      body: { },
    };
    usernameHandler.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameHandler.usernameArray[0]).to.equal(user);
    usernameHandler.deleteUsername(mockReq(request));
  });
  it("Should be true if the username (ALPHA) is corretly added when the array is empty", () => {
    const request = {
      params: { username : "", },
    };
    const response = {
      body: { },
    };
    usernameHandler.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameHandler.usernameArray.length).to.equal(0);
  });
  it("Should be true if the username (NUMERIC) is corretly added when the array is empty", () => {
    const user: string = "1234";
    const request = {
      params: { username : "1234", },
    };
    const response = {
      body: { },
    };
    usernameHandler.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameHandler.usernameArray[0]).to.equal(user);
    usernameHandler.deleteUsername(mockReq(request));
  });
  it("Should be true if the username (ALPHANUMERIC) is corretly added when the array is empty", () => {
    const user: string = "username12";
    const request = {
      params: { username : "username12", },
    };
    const response = {
      body: { },
    };
    usernameHandler.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameHandler.usernameArray[0]).to.equal(user);
    usernameHandler.deleteUsername(mockReq(request));
  });
  it("Should be true if the username is not added: name too short", () => {
    const request = {
      params: { username : "us", },
    };
    const response = {
      body: { },
    };
    usernameHandler.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameHandler.usernameArray.length).to.equal(0);
  });
  it("Should be true if the username is not added: name too long", () => {
    const request = {
      params: { username : "username1234567", },
    };
    const response = {
      body: { },
    };
    usernameHandler.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameHandler.usernameArray.length).to.equal(0);
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
    usernameHandler.verifyUsername(mockReq(firstRequest), mockRes(response));
    usernameHandler.verifyUsername(mockReq(secondRequest), mockRes(response));
    usernameHandler.verifyUsername(mockReq(thirdRequest), mockRes(response));
    expect(usernameHandler.usernameArray.length).to.equal(3);
    expect(usernameHandler.usernameArray[0]).to.equal("username1");
    expect(usernameHandler.usernameArray[1]).to.equal("username2");
    expect(usernameHandler.usernameArray[2]).to.equal("username3");
    usernameHandler.deleteUsername(mockReq(firstRequest));
    usernameHandler.deleteUsername(mockReq(secondRequest));
    usernameHandler.deleteUsername(mockReq(thirdRequest));
  });
  it("Should be true if two identical usernames are added", () => {
    const request = {
      params: { username : "username", },
    };
    const response = {
      body: { },
    };
    usernameHandler.verifyUsername(mockReq(request), mockRes(response));
    usernameHandler.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameHandler.usernameArray.length).to.equal(1);
    expect(usernameHandler.usernameArray[0]).to.equal("username");
    usernameHandler.deleteUsername(mockReq(request));
  });
  // deleteUsername
  it("Should return true if the username is removed from the array", () => {
    const request = {
      params: { username: "bob", },
    };
    const response = {
      body: { },
    };
    usernameHandler.verifyUsername(mockReq(request), mockRes(response));
    expect(usernameHandler.usernameArray.length).to.equal(1);
    usernameHandler.deleteUsername(mockReq(request));
    expect(usernameHandler.usernameArray.length).to.equal(0);
  });
});
