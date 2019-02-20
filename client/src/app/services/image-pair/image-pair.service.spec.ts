import { HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { Message } from "../../../../../common/communication/message";
import { ICommonImagePair } from "../../../../../common/model/imagePair";
import { TestHelper } from "../../../test.helper";
import { ImagePairService } from "./image-pair.service";

// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpyPost: any;
// tslint:disable-next-line:no-any Used to mock the http call
let initialViewServiceGet: ImagePairService;
let service: ImagePairService;
let httpMock: HttpTestingController;

describe("InitialViewService", () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [ImagePairService],
            });

            httpClientSpyPost = jasmine.createSpyObj("HttpClient", ["post"]);
            initialViewServiceGet = new ImagePairService(httpClientSpyPost);
            service = TestBed.get(ImagePairService);
            httpMock = TestBed.get(HttpTestingController);
        });

        it("Should return expected message on addImagePair request (HttpClient called once)", () => {
            const expectedImage: ICommonImagePair = {
                id: "1",
                url_difference: "/diff",
                url_modified: "/modif",
                url_original: "/origin",
                name: "image",
                creation_date: new Date(),
                differences_count: 7,
            };
            const mockImageName: string = "user1";
            const mockImageFile: File = {
                lastModified: 1000,
                size: 1000,
                name: "qasdas",
                type: "bmp",
                slice: (start: 0, end: 0, contentType: "aw") => new Blob,
            };

            httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedImage));

            initialViewServiceGet.addImagePair(mockImageName, mockImageFile, mockImageFile).subscribe(
                (response: ICommonImagePair) => {
                    expect(response.id).to.equal(expectedImage.id);
                    expect(response.name).to.equal(expectedImage.name);
                },
            );
        });

        it("should return an error if the image pair isn't added", () => {
            const mockImageName: string = "user1";
            const mockImageFile: File = {
                lastModified: 1000,
                size: 1000,
                name: "qasdas",
                type: "bmp",
                slice: (start: 0, end: 0, contentType: "aw") => new Blob,
            };
            service.addImagePair(mockImageName, mockImageFile, mockImageFile).subscribe((message: Message) => {
                expect(message.title).to.equal("Error");
                expect(message.body).to.equal("The image pair was not added");
            });

            const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/image-pair/");
            const mockErrorResponse: Object = { status: 400, statusText: "Bad Request" };
            expect(testRequest.request.method).to.equal("POST");

            testRequest.flush(
                {
                    "title": "Error",
                    "body": "The image pair was not added",
                },
                mockErrorResponse,
            );

            httpMock.verify();
        });

        it("Should return an image pair", () => {
            const expectedImage: ICommonImagePair = {
                id: "1",
                url_difference: "/diff",
                url_modified: "/modif",
                url_original: "/origin",
                name: "image",
                creation_date: new Date(),
                differences_count: 7,
            };

            service.getImagePairById("1").subscribe((imagePair: ICommonImagePair) => {
                expect(imagePair).to.equal(expectedImage);
            });

            const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/image-pair/1");
            expect(testRequest.request.method).to.equal("GET");

            testRequest.flush(expectedImage);

            httpMock.verify();

        });

        it("Should return an error if there is no image pair with the specified id", () => {
            service.getImagePairById("1").subscribe((message: Message) => {
                expect(message.title).to.equal("Error");
                expect(message.body).to.equal("There is no image pair with the specified id");
            });

            const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/image-pair/1");
            const mockErrorResponse: Object = { status: 400, statusText: "Bad Request" };
            expect(testRequest.request.method).to.equal("GET");

            testRequest.flush(
                {
                    "title": "Error",
                    "body": "There is no image pair with the specified id",
                },
                mockErrorResponse,
            );

            httpMock.verify();
        });
  });
