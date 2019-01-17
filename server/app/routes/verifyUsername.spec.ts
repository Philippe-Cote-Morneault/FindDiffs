import { UsernameValidation } from './verifyUsername';
import {expect} from 'chai';


describe('InitialViewService', () => {
  let verifyUsername = new UsernameValidation();
  //isEmpty
  it('Should return true if input empty', () => {
    let emptyString:string = "";
    expect(verifyUsername.isEmpty(emptyString)).to.equal(true);
  });
  it('Should return false if input is not empty', () => {
    let notEmptyString:string = "notEmpty";
    expect(verifyUsername.isEmpty(notEmptyString)).to.equal(false);
  });
  //isCorrectLength
  it('Should return false if input length is under 3', () => {
    let notEmptyString:string = "12";
    expect(verifyUsername.isCorrectLength(notEmptyString)).to.equal(false);
  });
  it('Should return false if input length is over 12', () => {
    let notEmptyString:string = "12345678910111213";
    expect(verifyUsername.isCorrectLength(notEmptyString)).to.equal(false);
  });
  it('Should return true if input length is between 3 and 12', () => {
    let notEmptyString:string = "1234567";
    expect(verifyUsername.isCorrectLength(notEmptyString)).to.equal(true);
  });
  //isAlpha
  it('Should return true if input is alpha', () => {
    let notEmptyString:string = "a";
    expect(verifyUsername.isAlpha(notEmptyString)).to.equal(true);
  });
  it('Should return false if input is numeric', () => {
    let notEmptyString:string = "6";
    expect(verifyUsername.isAlpha(notEmptyString)).to.equal(false);
  });
  it('Should return false if input is not alpha or numeric', () => {
    let notEmptyString:string = "%";
    expect(verifyUsername.isAlpha(notEmptyString)).to.equal(false);
  });
  //isNumeric
  it('Should return false if input is alpha', () => {
    let notEmptyString:string = "a";
    expect(verifyUsername.isNumeric(notEmptyString)).to.equal(false);
  });
  it('Should return true if input is numeric', () => {
    let notEmptyString:string = "6";
    expect(verifyUsername.isNumeric(notEmptyString)).to.equal(true);
  });
  it('Should return false if input is not alpha or numeric', () => {
    let notEmptyString:string = "%";
    expect(verifyUsername.isNumeric(notEmptyString)).to.equal(false);
  });
  //isAlphaNumeric
  it('Should return true if input contains only alpha', () => {
    let notEmptyString:string = "abcdefg";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it('Should return true if input contains only numeric', () => {
    let notEmptyString:string = "123456";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it('Should return true if input contains alpha and numeric', () => {
    let notEmptyString:string = "a1b2c3d4";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it('Should return false if input contains unsupported symbols', () => {
    let notEmptyString:string = "a1b2$c3d";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(false);
  });
  it('Should return false if input is an unsupported symbols', () => {
    let notEmptyString:string = "!";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(false);
  });
});
