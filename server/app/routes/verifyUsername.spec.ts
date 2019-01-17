import { UsernameValidation } from './verifyUsername';
import {expect} from 'chai';


describe('InitialViewService', () => {
  let verifyUsername = new UsernameValidation();
  //isEmpty
  it('Should be true if input empty', () => {
    let emptyString:string = "";
    expect(verifyUsername.isEmpty(emptyString)).to.equal(true);
  });
  it('Should be false if input is not empty', () => {
    let notEmptyString:string = "notEmpty";
    expect(verifyUsername.isEmpty(notEmptyString)).to.equal(false);
  });
  //isCorrectLength
  it('Should be false if input length is under 3', () => {
    let notEmptyString:string = "12";
    expect(verifyUsername.isCorrectLength(notEmptyString)).to.equal(false);
  });
  it('Should be false if input length is over 12', () => {
    let notEmptyString:string = "12345678910111213";
    expect(verifyUsername.isCorrectLength(notEmptyString)).to.equal(false);
  });
  it('Should be true if input length is between 3 and 12', () => {
    let notEmptyString:string = "1234567";
    expect(verifyUsername.isCorrectLength(notEmptyString)).to.equal(true);
  });
  //isAlpha
  it('Should be true if input is alpha', () => {
    let notEmptyString:string = "a";
    expect(verifyUsername.isAlpha(notEmptyString)).to.equal(true);
  });
  it('Should be false if input is numeric', () => {
    let notEmptyString:string = "6";
    expect(verifyUsername.isAlpha(notEmptyString)).to.equal(false);
  });
  it('Should be false if input is not alpha or numeric', () => {
    let notEmptyString:string = "%";
    expect(verifyUsername.isAlpha(notEmptyString)).to.equal(false);
  });
  //isNumeric
  it('Should be false if input is alpha', () => {
    let notEmptyString:string = "a";
    expect(verifyUsername.isNumeric(notEmptyString)).to.equal(false);
  });
  it('Should be true if input is numeric', () => {
    let notEmptyString:string = "6";
    expect(verifyUsername.isNumeric(notEmptyString)).to.equal(true);
  });
  it('Should be false if input is not alpha or numeric', () => {
    let notEmptyString:string = "%";
    expect(verifyUsername.isNumeric(notEmptyString)).to.equal(false);
  });
  //isAlphaNumeric
  it('Should be true if input contains only alpha', () => {
    let notEmptyString:string = "abcdefg";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it('Should be true if input contains only numeric', () => {
    let notEmptyString:string = "123456";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it('Should be true if input contains alpha and numeric', () => {
    let notEmptyString:string = "a1b2c3d4";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(true);
  });
  it('Should be false if input contains unsupported symbols', () => {
    let notEmptyString:string = "a1b2$c3d";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(false);
  });
  it('Should be false if input is an unsupported symbols', () => {
    let notEmptyString:string = "!";
    expect(verifyUsername.isAlphaNumeric(notEmptyString)).to.equal(false);
  });
 
  //isArrayEmpty
  it('Should be true if the array is empty', () =>{
    let emptyArray:string[] = [];
    expect(verifyUsername.isArrayEmpty(emptyArray)).to.equal(true);
  });
  it('Should be false if the array is not empty', () =>{
    let notEmptyArray:string[] = ["Jack o' Lantern"];
    expect(verifyUsername.isArrayEmpty(notEmptyArray)).to.equal(false);
  });
  it('Should be false if the array is not empty', () =>{
    let notEmptyArray:string[] = ["5","6","bonsoir"];
    expect(verifyUsername.isArrayEmpty(notEmptyArray)).to.equal(false);
  });
  //add
  it('Should be false if the array is not empty after add function', () =>{
    let notEmptyArray:string[] = [];
    verifyUsername.add("username",notEmptyArray);
    expect(verifyUsername.isArrayEmpty(notEmptyArray)).to.equal(false);
  });
  it('Should be true if the username corresponds to the added username', () =>{
    let notEmptyArray:string[] = [];
    verifyUsername.add("username",notEmptyArray);
    expect(notEmptyArray[0]).to.equal("username");
  });
  it('Should be true if the length of the array corresponds to the number of added username', () =>{
    let notEmptyArray:string[] = [];
    verifyUsername.add("username1",notEmptyArray);
    verifyUsername.add("username2",notEmptyArray);
    verifyUsername.add("username3",notEmptyArray);
    expect(notEmptyArray.length).to.equal(3);
  }); 
  //isAvailable
  it('Should be true if the array is empty', () =>{
    let emptyArray:string[] = [];
    expect(verifyUsername.isAvailable("username",emptyArray)).to.equal(true);
  });
  it('Should be true if the username is not in the array', () =>{
    let notEmptyArray:string[] = [];
    verifyUsername.add("username1",notEmptyArray);
    verifyUsername.add("username2",notEmptyArray);
    verifyUsername.add("username3",notEmptyArray);
    expect(verifyUsername.isAvailable("username4",notEmptyArray)).to.equal(true);
  });
  it('Should be false if the username is in the array', () =>{
    let notEmptyArray:string[] = [];
    verifyUsername.add("username",notEmptyArray);
    expect(verifyUsername.isAvailable("username",notEmptyArray)).to.equal(false);
  });
  it('Should be false if the username is in the array and the array has multiple usernames', () =>{
    let notEmptyArray:string[] = [];
    verifyUsername.add("username1",notEmptyArray);
    verifyUsername.add("username2",notEmptyArray);
    verifyUsername.add("username3",notEmptyArray);    
    expect(verifyUsername.isAvailable("username3",notEmptyArray)).to.equal(false);
  });
});
