import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { FormVerificationSimplePOVService } from "./formVerificationSimplePOV.service";

describe("formVerificationSimplePOVService", () => {
    let service: FormVerificationSimplePOVService;

    beforeEach(() => {
        service = TestBed.get(FormVerificationSimplePOVService);
    });

    describe("isOriginalFileValid()", () => {
        it("Should return false if the orinal field is false", () => {
            const fromValidation: boolean[] = [false, false, false, false, false];
            const response: boolean = service.isOriginalFileValid(fromValidation);
            expect(response).to.equal(false);
        });
        it("Should return true if the orinal field is true", () => {
            const fromValidation: boolean[] = [false, false, false, true, false];
            const response: boolean = service.isOriginalFileValid(fromValidation);
            expect(response).to.equal(true);
        });
    });
    describe("isModifiedFileValid()", () => {
        it("Should return false if the modified field is false", () => {
            const fromValidation: boolean[] = [false, false, false, false, false];
            const response: boolean = service.isModifiedFileValid(fromValidation);
            expect(response).to.equal(false);
        });
        it("Should return true if the modified field is true", () => {
            const fromValidation: boolean[] = [false, false, false, false, true];
            const response: boolean = service.isModifiedFileValid(fromValidation);
            expect(response).to.equal(true);
        });
    });
    describe("verifyInfo()", () => {
        it("Should return false if one of the field is false", () => {
            const fromValidation: boolean[] = [false, true, true, true, true];
            const response: boolean = service.verifyInfo(fromValidation);
            expect(response).to.equal(false);
        });
        it("Should return true if all of the field are true", () => {
            const fromValidation: boolean[] = [true, true, true, true, true];
            const response: boolean = service.verifyInfo(fromValidation);
            expect(response).to.equal(true);
        });
    });
});
