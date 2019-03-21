import { HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { Message } from "../../../../../../common/communication/message";
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

        it("should return expected message on post3DObject request (HttpClient called once)", () => {
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
    });
});
