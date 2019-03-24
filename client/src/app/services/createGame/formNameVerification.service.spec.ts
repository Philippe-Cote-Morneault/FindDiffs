import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { FormNameVerificationService } from "./formNameVerification.service";

describe("formNameVerificationService", () => {
    let service: FormNameVerificationService;

    beforeEach(() => {
        service = TestBed.get(FormNameVerificationService);
    });

    describe("isnameValid()", () => {
        it("Should return false if the name is too short (<10)", () => {
            const name: string = "ab";
            const response: boolean = service.isNameValid(name);
            expect(response).to.equal(false);
         });
        it("Should return false if the name is too long (>12)", () => {
            const name: string = "123456789101112";
            const response: boolean = service.isNameValid(name);
            expect(response).to.equal(false);
        });
        it("Should return false if the name contains a none alphanumeric character", () => {
            const name: string = "abcd%";
            const response: boolean = service.isNameValid(name);
            expect(response).to.equal(false);
        });
        it("Should return true if the name is between 3 and 12", () => {
            const name: string = "abcde";
            const response: boolean = service.isNameValid(name);
            expect(response).to.equal(true);
        });
    });
});
