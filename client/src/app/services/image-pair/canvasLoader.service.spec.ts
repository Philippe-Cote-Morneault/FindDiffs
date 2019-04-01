import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { expect } from "chai";
import { CanvasLoaderService } from "./canvasLoader.service";

describe("CanvasLoaderService", () => {
    let service: CanvasLoaderService;
    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        service = TestBed.get(CanvasLoaderService);
    });

    it("Should add an eventListner to an HTML canvas", () => {
        const dummyContainer: HTMLCanvasElement = (document.createElement("canvas") as HTMLCanvasElement);
        expect(JSON.stringify(dummyContainer)).to.equal("{}");
        service.loadCanvas(dummyContainer, "345345345");

        expect(JSON.stringify(dummyContainer)).to.not.equal("{}");
    });
});