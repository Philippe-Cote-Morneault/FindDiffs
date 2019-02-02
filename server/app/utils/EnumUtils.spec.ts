import {expect} from "chai";
import { EnumUtils } from "./EnumUtils";

enum TestEnum { One, Two, Three}
enum TestEnumValues {One = 1, Two = 2, Three = 3}
enum TestEnumLonger {One, Two, Three, Four, Five, Six}

// tslint:disable no-magic-numbers

describe("EnumUtils", () => {
    describe("isStringInEnum()", () => {
        it("Should return false if string is not in enum", () => {
            expect(EnumUtils.isStringInEnum("test", TestEnum)).to.equal(false);
        });
        it("Should return false if string is not in enum with values", () => {
            expect(EnumUtils.isStringInEnum("test", TestEnumValues)).to.equal(false);
        });
        it("Should return true if string is in enum", () => {
            expect(EnumUtils.isStringInEnum("One", TestEnum)).to.equal(true);
        });
        it("Should return true if string is in enum with values", () => {
            expect(EnumUtils.isStringInEnum("One", TestEnumValues)).to.equal(true);
        });
    });
    describe("enumFromString()", () => {
        it("Should return undefined if the element is not present in the enum", () => {
            expect(EnumUtils.enumFromString("test", TestEnum)).to.equal(undefined);
        });
        it("Should return undefined if the element is not present in the enum with values", () => {
            expect(EnumUtils.enumFromString("test", TestEnumValues)).to.equal(undefined);
        });
        it("Should return the element if the string is present in the enum", () => {
            expect(EnumUtils.enumFromString<TestEnum>("One", TestEnum)).to.equal(TestEnum.One);
        });
        it("Should return the element if the string is present in the enum with values", () => {
            expect(EnumUtils.enumFromString<TestEnumValues>("One", TestEnumValues)).to.equal(TestEnumValues.One);
        });
    });
    describe("enumLength()", () => {
        it("Should return 3 for the size of the test enum", () => {
            expect(EnumUtils.enumLength(TestEnum)).to.equal(3);
        });
        it("Should return 3 for the size of the test enum with values", () => {
            expect(EnumUtils.enumLength(TestEnumValues)).to.equal(3);
        });
        it("Should return 6 for the size of the longer test enum", () => {
            expect(EnumUtils.enumLength(TestEnumLonger)).to.equal(6);
        });
    });

});
