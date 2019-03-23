import { HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { Message } from "../../../../../common/communication/message";
import { ICommonReveal } from "../../../../../common/model/reveal";
import { TestHelper } from "../../../test.helper";
import { PixelPositionService } from "./pixelPosition.service";

// tslint:disable:no-magic-numbers
// tslint:disable:no-any Used to mock the http call
let httpClientSpyPost: any;
let httpMock: HttpTestingController;
let pixelPositionService: PixelPositionService;
let service: PixelPositionService;
describe("PixelPositionService", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PixelPositionService],
        });

        httpClientSpyPost = jasmine.createSpyObj("HttpClient", ["post"]);
        pixelPositionService = new PixelPositionService(httpClientSpyPost);
        service = TestBed.get(PixelPositionService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should return expected message on postPixelPosition request (HttpClient called once)", () => {
        const expectedResponse: Object = { "hit": true, "pixels_affected": [{"x": 2, "y": 2}, {"x": 3, "y": 2}]};
        const mockID: string = "128391";
        const mockX: number = 2;
        const mockY: number = 3;
        httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedResponse));

        pixelPositionService.postPixelPosition(mockID, mockX, mockY).subscribe(
            (response: ICommonReveal) => {
                expect(response.hit).to.equal(true);
                expect(response.pixels_affected.length).to.equal(2);
                expect(response.pixels_affected[0].x).to.equal(2);
            },
            fail,
        );
    });

    it("should return an error if no differences were found", () => {
        const mockID: string = "128391";
        const mockX: number = 2;
        const mockY: number = 3;
        const expectedMessageError: Message = { title: "Error", body: "No difference was found at the specified position" };

        service.postPixelPosition(mockID, mockX, mockY).subscribe((message: Message) => {
            expect(message.title).to.equal(expectedMessageError.title);
            expect(message.body).to.equal(expectedMessageError.body);
        });

        const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/difference/simple");
        const mockHttpError: Object = {status: 404, statusText: "Bad Request"} ;
        expect(testRequest.request.method).to.equal("POST");

        testRequest.flush(
            {
                "title": "Error",
                "body": "No difference was found at the specified position",
            },
            mockHttpError,
        );

        httpMock.verify();
    });

});
