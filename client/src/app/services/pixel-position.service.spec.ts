import { HttpErrorResponse } from "@angular/common/http";
import { Message } from "../../../../common/communication/message";
import { ICommonReveal } from "../../../../common/model/reveal";
import { TestHelper } from "../../test.helper";
import { PixelPositionService } from "./pixel-position.service";

// tslint:disable:no-magic-numbers
// tslint:disable:no-any Used to mock the http call
let httpClientSpyPost: any;
let pixelPositionService: PixelPositionService;

describe("UserService", () => {

    beforeEach(() => {
        httpClientSpyPost = jasmine.createSpyObj("HttpClient", ["post"]);
        pixelPositionService = new PixelPositionService(httpClientSpyPost);
    });

    it("should return expected message on postPixelPosition request (HttpClient called once)", () => {
        const expectedResponse: Object = { "hit": "true", "pixels_affected": [{"x": 2, "y": 2}, {"x": 3, "y": 2}]};
        const mockID: string = "128391";
        const mockX: number = 2;
        const mockY: number = 3;
        httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedResponse));

        pixelPositionService.postPixelPosition(mockID, mockX, mockY).subscribe(
            (response: ICommonReveal) => {
                expect(response.hit).toEqual(true);
                expect(response.pixels_affected.length).toEqual(2);
                expect(response.pixels_affected[0].x).toEqual(2);
            },
            fail,
        );

        expect(httpClientSpyPost.post.calls.count()).toBe(1, "one call");
    });

    it("should return an error message", () => {
        const expectedMessageError: Message = { title: "Error", body: "No difference was found at the specified position" };
        const mockHttpError: HttpErrorResponse = new HttpErrorResponse({
            error: {
                title: "Error", body: "No difference was found at the specified position",
            },
            status: 404 });
        pixelPositionService.handleError(mockHttpError).subscribe(
            (data) => {
                expect(data).toEqual(expectedMessageError);
            },
        );
    });

});
