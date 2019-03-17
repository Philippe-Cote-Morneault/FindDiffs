import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { FormVerificationFreePOVService } from "./formVerificationFreePOV.service";

describe("formNameVerificationService", () => {
    let service: FormVerificationFreePOVService;

    beforeEach(() => {
        service = TestBed.get(FormVerificationFreePOVService);
    });
    describe("isModificationTypeValid", () => {
        it("Should return false if all modifications are false", () => {
            const isAddType: boolean = false;
            const isRemoveType: boolean = false;
            const isModifiedType: boolean = false;
            const response: boolean = service.isModificationTypeValid(isAddType, isRemoveType, isModifiedType);
            expect(response).to.equal(false);
        });
        it("Should return true if all modifications are true", () => {
            const isAddType: boolean = true;
            const isRemoveType: boolean = true;
            const isModifiedType: boolean = true;
            const response: boolean = service.isModificationTypeValid(isAddType, isRemoveType, isModifiedType);
            expect(response).to.equal(true);
        });
        it("Should return true if 1 modifications is true", () => {
            const isAddType: boolean = true;
            const isRemoveType: boolean = false;
            const isModifiedType: boolean = false;
            const response: boolean = service.isModificationTypeValid(isAddType, isRemoveType, isModifiedType);
            expect(response).to.equal(true);
        });
        it("Should return true if 2 modifications are true", () => {
            const isAddType: boolean = true;
            const isRemoveType: boolean = true;
            const isModifiedType: boolean = false;
            const response: boolean = service.isModificationTypeValid(isAddType, isRemoveType, isModifiedType);
            expect(response).to.equal(true);
        });
    });
    describe("isQuantityValid", () => {
        it("Should return false if the quantity is under 10", () => {
            const quantity: number = 8;
            const response: boolean = service.isQuantityValid(quantity);
            expect(response).to.equal(false);
        });
        it("Should return false if the quantity is over 200", () => {
            const quantity: number = 205;
            const response: boolean = service.isQuantityValid(quantity);
            expect(response).to.equal(false);
        });
        it("Should return false if the quantity is not numeric", () => {
            const quantity: string = "ab";
            const response: boolean = service.isQuantityValid(Number(quantity));
            expect(response).to.equal(false);
        });
        it("Should return true if the quantity is between 10 and 200", () => {
            const quantity: number = 55;
            const response: boolean = service.isQuantityValid(quantity);
            expect(response).to.equal(true);
        });
    });
});
