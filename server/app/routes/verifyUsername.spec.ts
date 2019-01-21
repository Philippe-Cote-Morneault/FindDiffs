import {expect} from "chai";
import { UsernameValidation } from "./verifyUsername";

/* tslint:disable:no-magic-numbers */

describe("InitialViewService", () => {
  const verifyUsername: UsernameValidation = new UsernameValidation();

  // isEmpty
  it("Should be true if input empty", () => {
    const emptyString: string = "";
    expect(verifyUsername.isEmpty(emptyString)).to.equal(true);
  });
  it("Should be false if input is not empty", () => {
    const notEmptyString: string = "notEmpty";
    expect(verifyUsername.isEmpty(notEmptyString)).to.equal(false);
  });

  // isCorrectLength
  it("Should be false if input length is under 3", () => {
    const notEmptyString: string = "12";
    expect(verifyUsername.isCorrectLength(notEmptyString)).to.equal(false);
  });
  it("Should be false if input length is over 12", () => {
    const notEmptyString: string = "12345678910111213";
    expect(verifyUsername.isCorrectLength(notEmptyString)).to.equal(false);
  });
  it("Should be true if input length is between 3 and 12", () => {
    const notEmptyString: string = "1234567";
    expect(verifyUsername.isCorrectLength(notEmptyString)).to.equal(true);
  });

  // isAlpha
  it("Should be true if input is alpha", () => {
    const notEmptyString: string = "a";
    expect(verifyUsername.isAlpha(notEmptyString)).to.equal(true);
  });
  it("Should be false if input is numeric", () => {
    const notEmptyString: string = "6";
    expect(verifyUsername.isAlpha(notEmptyString)).to.equal(false);
  });
  it("Should be false if input is not alpha or numeric", () => {
    const notEmptyString: string = "%";
    expect(verifyUsername.isAlpha(notEmptyString)).to.equal(false);
  });

  // isNumeric
  it("Should be false if input is alpha", () => {
    const notEmptyString: string = "a";
    expect(verifyUsername.isNumeric(notEmptyString)).to.equal(false);
  });
  it("Should be true if input is numeric", () => {
    const notEmptyString: string = "6";
    expect(verifyUsername.isNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be false if input is not alpha or numeric", () => {
    const notEmptyString: string = "%";
    expect(verifyUsername.isNumeric(notEmptyString)).to.equal(false);
  });

  // isAlphaNumeric
  it("Should be true if input contains only alpha", () => {
    const notEmptyString: string = "abcdefg";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be true if input contains only numeric", () => {
    const notEmptyString: string = "123456";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be true if input contains alpha and numeric", () => {
    const notEmptyString: string = "a1b2c3d4";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it("Should be false if input contains unsupported symbols", () => {
    const notEmptyString: string = "a1b2$c3d";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(false);
  });
  it("Should be false if input is an unsupported symbols", () => {
    const notEmptyString: string = "!";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(false);
  });

  // isArrayEmpty
  it("Should be true if the array is empty", () => {
    const emptyArray: string[] = [];
    expect(verifyUsername.isArrayEmpty(emptyArray)).to.equal(true);
  });
  it("Should be false if the array is not empty", () => {
    const notEmptyArray: string[] = ["Jack o' Lantern"];
    expect(verifyUsername.isArrayEmpty(notEmptyArray)).to.equal(false);
  });
  it("Should be false if the array is not empty", () => {
    const notEmptyArray: string[] = ["5", "6", "bonsoir"];
    expect(verifyUsername.isArrayEmpty(notEmptyArray)).to.equal(false);
  });

  // add
  it("Should be false if the array is not empty after add function", () => {
    const notEmptyArray: string[] = [];
    verifyUsername.add("username", notEmptyArray);
    expect(verifyUsername.isArrayEmpty(notEmptyArray)).to.equal(false);
  });
  it("Should be true if the username corresponds to the added username", () => {
    const notEmptyArray: string[] = [];
    verifyUsername.add("username", notEmptyArray);
    expect(notEmptyArray[0]).to.equal("username");
  });
  it("Should be true if the length of the array corresponds to the number of added username", () => {
    const notEmptyArray: string[] = [];
    verifyUsername.add("username1", notEmptyArray);
    verifyUsername.add("username2", notEmptyArray);
    verifyUsername.add("username3", notEmptyArray);
    expect(notEmptyArray.length).to.equal(3);
  });

  // isAvailable
  it("Should be true if the array is empty", () => {
    const emptyArray: string[] = [];
    expect(verifyUsername.isAvailable("username", emptyArray)).to.equal(true);
  });
  it("Should be true if the username is not in the array", () => {
    const notEmptyArray: string[] = [];
    verifyUsername.add("username1", notEmptyArray);
    verifyUsername.add("username2", notEmptyArray);
    verifyUsername.add("username3", notEmptyArray);
    expect(verifyUsername.isAvailable("username4", notEmptyArray)).to.equal(true);
  });
  it("Should be false if the username is in the array", () => {
    const notEmptyArray: string[] = [];
    verifyUsername.add("username", notEmptyArray);
    expect(verifyUsername.isAvailable("username", notEmptyArray)).to.equal(false);
  });
  it("Should be false if the username is in the array and the array has multiple usernames", () => {
    const notEmptyArray: string[] = [];
    verifyUsername.add("username1", notEmptyArray);
    verifyUsername.add("username2", notEmptyArray);
    verifyUsername.add("username3", notEmptyArray);
    expect(verifyUsername.isAvailable("username3", notEmptyArray)).to.equal(false);
  });
});
