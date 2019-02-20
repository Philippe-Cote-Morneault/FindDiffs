import { HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { Message } from "../../../../../common/communication/message";
import { ICommonUser } from "../../../../../common/model/user";
import { TestHelper } from "../../../test.helper";
import { UserService } from "./user.service";

// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpyPost: any;
// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpyDelete: any;
let userServicePost: UserService;
let userServiceDelete: UserService;
let httpMock: HttpTestingController;
let service: UserService;

describe("UserService", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService],
        });

        httpClientSpyPost = jasmine.createSpyObj("HttpClient", ["post"]);
        httpClientSpyDelete = jasmine.createSpyObj("HttpClient", ["delete"]);
        userServicePost = new UserService(httpClientSpyPost);
        userServiceDelete = new UserService(httpClientSpyDelete);
        httpMock = TestBed.get(HttpTestingController);
        service = TestBed.get(UserService);
    });

    it("should return expected message on verifyUsername request (HttpClient called once)", () => {
        const expectedUser: ICommonUser = { id: "1", username: "user1", creation_date: new Date() };
        const mockUsername: string = "user1";
        httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedUser));

        userServicePost.postUsernameValidation(mockUsername).subscribe(
            (response: ICommonUser) => {
                expect(response.id).to.equal(expectedUser.id, "Id check");
                expect(response.username).to.equal(expectedUser.username, "Username check");
            },
            fail,
        );
    });

    it("should return expected message on deleteUsername request (HttpClient called once)", () => {
        const expectedMessage: Message = { title: "UsernameDeleted", body: "user1" };
        const mockUserId: string = "user1";
        httpClientSpyDelete.delete.and.returnValue(TestHelper.asyncData(expectedMessage));

        userServiceDelete.deleteUsername(mockUserId).subscribe(
            (response: Message) => {
                expect(response.title).to.equal(expectedMessage.title, "Title check");
                expect(response.body).to.equal(expectedMessage.body, "body check");
            },
            fail,
        );
    });

    it("should return an error if username is invalid", () => {
        const expectedMessageError: Message = { title: "Error", body: "The username is invalid" };

        service.postUsernameValidation("user").subscribe((message: Message) => {
            expect(message.title).to.equal(expectedMessageError.title);
            expect(message.body).to.equal(expectedMessageError.body);
        });

        const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/user/");
        const mockHttpError: Object = {status: 404, statusText: "Bad Request"} ;
        expect(testRequest.request.method).to.equal("POST");

        testRequest.flush(
            {
                "title" : "Error",
                "body": "The username is invalid",
            },
            mockHttpError,
        );
        httpMock.verify();
   });

    it("should return an error if the username can't be deleted", () => {
        const expectedMessageError: Message = { title: "Error", body: "The username doesn't exist" };

        service.deleteUsername("1").subscribe((message: Message) => {
            expect(message.title).to.equal(expectedMessageError.title);
            expect(message.body).to.equal(expectedMessageError.body);
        });

        const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/user/1");
        const mockHttpError: Object = {status: 404, statusText: "Bad Request"} ;
        expect(testRequest.request.method).to.equal("DELETE");

        testRequest.flush(
            {
            "title" : "Error",
            "body": "The username doesn't exist",
            },
            mockHttpError,
        );
        httpMock.verify();
   });

});
