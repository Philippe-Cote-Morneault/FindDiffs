import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { IdentificationError } from "./identificationError.service";

describe("TimerService", () => {
    let service: IdentificationError;

    beforeEach(() => {
        service = TestBed.get(IdentificationError);
    });

    it("Should return the correct values", () => {
        const p: HTMLElement = document.createElement("p");
        const original: HTMLElement = document.createElement("div");
        const modified: HTMLElement = document.createElement("div");
        const x: number = 50;
        const y: number = 50;
        const time: number = 2000;

        service.showErrorMessage(x , y, p, original, modified);
        expect(p.style.top).to.equal("50px");
        expect(p.style.left).to.equal("50px");
        expect(original.style.cursor).to.equal("not-allowed");
        expect(modified.style.cursor).to.equal("not-allowed");
        expect(p.style.cursor).to.equal("not-allowed");

        setTimeout(() => {
            expect(original.style.cursor).to.equal("context-menu");
            expect(modified.style.cursor).to.equal("context-menu");
            expect(p.style.cursor).to.equal("context-menu");
                }, time);
    });
});
