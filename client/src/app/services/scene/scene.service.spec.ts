import { HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { Message } from "../../../../../common/communication/message";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonGeometricScene, ICommonScene } from "../../../../../common/model/scene/scene";
import { TestHelper } from "../../../test.helper";
import { SceneService } from "./scene.service";

// tslint:disable:no-magic-numbers
// tslint:disable:no-any Used to mock the http call
let httpClientSpyPost: any;
let httpClientSpyGet: any;
let sceneServicePost: SceneService;
let sceneServiceGet: SceneService;
let httpMock: HttpTestingController;
let service: SceneService;

describe("UserService", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SceneService],
        });

        httpClientSpyPost = jasmine.createSpyObj("HttpClient", ["post"]);
        httpClientSpyGet = jasmine.createSpyObj("HttpClient", ["get"]);
        sceneServicePost = new SceneService(httpClientSpyPost);
        sceneServiceGet = new SceneService(httpClientSpyGet);
        httpMock = TestBed.get(HttpTestingController);
        service = TestBed.get(SceneService);
    });

    it("should return expected message on createScene request (HttpClient called once)", () => {
        const expectedResponse: Object = {"bg_color": "red", "dimensions": 2, "id": "928374" , "sceneObject": "scene", "texture": "none"};
        const mockType: string = "Geometry";
        const mockQty: number = 2;
        httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedResponse));

        sceneServicePost.createScene(mockType, mockQty).subscribe(
            (response: ICommonGeometricScene) => {
                expect(response.id).to.equal("928374");
                expect(response.bg_color).to.equal("red");
            },
            fail,
        );
    });
    it("should return expected message on createModifiedScene request (HttpClient called once)", () => {
        const expectedResponse: Object = {"addedObjects": ["132342"], "colorChangedObjects": [{key: "3243", value: 3232323}],
                                          "deletedObjects": ["323232"] , "id": "123098"};
        const mockId: string = "123098";
        const mockAdd: boolean = true;
        const mockRemove: boolean = true;
        const mockColor: boolean = false;

        httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedResponse));

        sceneServicePost.createModifiedScene(mockId, mockAdd, mockRemove, mockColor).subscribe(
            (response: ICommonSceneModifications) => {
                expect(response.id).to.equal("123098");
            },
            fail,
        );
    });

    it("should return an error if the scene is not added", () => {
        const expectedMessageError: Message = { title: "Error", body: "The scene was not added" };
        service.createScene("Geometric", 50).subscribe((message: Message) => {
            expect(message.title).to.equal(expectedMessageError.title);
            expect(message.body).to.equal(expectedMessageError.body);
        });

        const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/scene/");
        const mockHttpError: Object = {status: 404, statusText: "Bad Request"} ;
        expect(testRequest.request.method).to.equal("POST");

        testRequest.flush(
            {
                "title": "Error",
                "body": "The scene was not added",
            },
            mockHttpError,
        );
        httpMock.verify();
    });

    it("should return an error if the scene is not modified", () => {
        const expectedMessageError: Message = { title: "Error", body: "The scene was not modified" };
        service.createModifiedScene("1", true, false, false).subscribe((message: Message) => {
            expect(message.title).to.equal(expectedMessageError.title);
            expect(message.body).to.equal(expectedMessageError.body);
        });

        const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/scene/1/modified");
        const mockHttpError: Object = {status: 404, statusText: "Bad Request"} ;
        expect(testRequest.request.method).to.equal("POST");

        testRequest.flush(
            {
                "title": "Error",
                "body": "The scene was not modified",
            },
            mockHttpError,
        );
        httpMock.verify();
    });
    it("should return expected message on getSceneById request (HttpClient called once)", () => {
        const expectedResponse: Object = {"bg_color": "red", "dimensions": 2, "id": "928374" , "sceneObject": "scene", "texture": "none"};

        httpClientSpyGet.get.and.returnValue(TestHelper.asyncData(expectedResponse));

        sceneServiceGet.getSceneById("1234232").subscribe(
            (response: ICommonScene) => {
                expect(response.id).to.equal("928374");
            },
            fail,
        );
    });
    it("should return expected message on getModifiedSceneById request (HttpClient called once)", () => {
        const expectedResponse: Object = {"addedObjects": ["132342"], "colorChangedObjects": [{key: "3243", value: 3232323}],
                                          "deletedObjects": ["323232"] , "id": "123098"};

        httpClientSpyGet.get.and.returnValue(TestHelper.asyncData(expectedResponse));

        sceneServiceGet.getModifiedSceneById("1234232").subscribe(
            (response: ICommonSceneModifications) => {
                expect(response.id).to.equal("123098");
            },
            fail,
        );
    });
    it("should return an error if the scene is not found", () => {
        const expectedMessageError: Message = { title: "Error", body: "The scene was not found" };
        service.getSceneById("12345").subscribe((message: Message) => {
            expect(message.title).to.equal(expectedMessageError.title);
            expect(message.body).to.equal(expectedMessageError.body);
        });

        const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/scene/12345");
        const mockHttpError: Object = {status: 404, statusText: "Bad Request"} ;
        expect(testRequest.request.method).to.equal("GET");

        testRequest.flush(
            {
                "title": "Error",
                "body": "The scene was not found",
            },
            mockHttpError,
        );
        httpMock.verify();
    });
    it("should return an error if the modified scene is not found", () => {
        const expectedMessageError: Message = { title: "Error", body: "The scene was not found" };
        service.getModifiedSceneById("12345").subscribe((message: Message) => {
            expect(message.title).to.equal(expectedMessageError.title);
            expect(message.body).to.equal(expectedMessageError.body);
        });

        const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/scene/12345/modified");
        const mockHttpError: Object = {status: 404, statusText: "Bad Request"} ;
        expect(testRequest.request.method).to.equal("GET");

        testRequest.flush(
            {
                "title": "Error",
                "body": "The scene was not found",
            },
            mockHttpError,
        );
        httpMock.verify();
    });
});
