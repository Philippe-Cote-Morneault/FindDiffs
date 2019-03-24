import { HttpClientTestingModule, HttpTestingController/*, TestRequest*/} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
// import { Message } from "../../../../../../common/communication/message";
import { DifferenceType, ICommonReveal3D } from "../../../../../../common/model/reveal";
import { TestHelper } from "../../../../test.helper";
import { GeometricObjectsService } from "./geometric-objects.service";

// tslint:disable:no-magic-numbers
// tslint:disable:no-any Used to mock the http call
let httpClientSpyPost: any;
let httpMock: HttpTestingController;
let geometricObjectsService: GeometricObjectsService;
let service: GeometricObjectsService;
describe("GeometricObjectsService", () => {
    // tslint:disable-next-line:max-func-body-length
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GeometricObjectsService],
        });

        httpClientSpyPost = jasmine.createSpyObj("HttpClient", ["post"]);
        geometricObjectsService = new GeometricObjectsService(httpClientSpyPost);
        service = TestBed.get(GeometricObjectsService);
        httpMock = TestBed.get(HttpTestingController);

        if (httpMock) {};
        if (service) {};

        it("should return hit false with DifferenceType none on post3DObject request (HttpClient called once)", () => {
            const expectedResponse: Object = { "hit": false, "differenceType": DifferenceType.none};
            const mockSceneID: string = "128392";
            const mockModifiedObjectId: string = "123";
            const mockOriginalObjectId: string = "123";
            httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedResponse));

            geometricObjectsService.post3DObject(mockSceneID, mockModifiedObjectId, mockOriginalObjectId).subscribe(
                (response: ICommonReveal3D) => {
                    expect(response.hit).to.equal(false);
                    expect(response.differenceType).to.equal(DifferenceType.none);
                },
                fail,
            );
        });

        it("should return hit true with DifferenceType none on post3DObject request (HttpClient called once)", () => {
            const expectedResponse: Object = { "hit": true, "differenceType": DifferenceType.colorChanged};
            const mockSceneID: string = "128392";
            const mockModifiedObjectId: string = "123";
            const mockOriginalObjectId: string = "123";
            httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedResponse));

            geometricObjectsService.post3DObject(mockSceneID, mockModifiedObjectId, mockOriginalObjectId).subscribe(
                (response: ICommonReveal3D) => {
                    expect(response.hit).to.equal(true);
                    expect(response.differenceType).to.equal(DifferenceType.colorChanged);
                },
                fail,
            );
        });
/*
        it("should return an error if no differences were found", () => {
            const mockSceneID: string = "128392";
            const mockModifiedObjectId: string = "123";
            const mockOriginalObjectId: string = "123";
            const expectedMessageError: Message = { title: "Error", body: "No difference was found at the specified position" };

            service.post3DObject(mockSceneID, mockModifiedObjectId, mockOriginalObjectId).subscribe((message: Message) => {
                expect(message.title).to.equal(expectedMessageError.title);
                expect(message.body).to.equal(expectedMessageError.body);
            });

            const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/difference/free");
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
        });*/
    });
});
