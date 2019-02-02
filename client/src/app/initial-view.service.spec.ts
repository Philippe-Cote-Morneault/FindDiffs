import { Message } from "../../../common/communication/message";
import { TestHelper } from "../test.helper";
import { InitialViewService } from "./initial-view.service";

// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpy: any;
let initialViewService: InitialViewService;

describe("InitialViewService", () => {

        beforeEach(() => {
            httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
            initialViewService = new InitialViewService(httpClientSpy);
        });

        it("should return expected message on verifyUsername request (HttpClient called once)", () => {
            const expectedMessage: Message = { body: "VerifyUsername", title: "user1" };
            const mockUser: string = "user1";
            httpClientSpy.get.and.returnValue(TestHelper.asyncData(expectedMessage));

            initialViewService.getUsernameValidation(mockUser).subscribe(
                (response: Message) => {
                    expect(response.title).toEqual(expectedMessage.title, "Title check");
                    expect(response.body).toEqual(expectedMessage.body, "body check");
                },
                fail,
            );

            expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
        });

        it("should return expected message on deleteUsername request (HttpClient called once)", () => {
            const expectedMessage: Message = { body: "UsernameDeleted", title: "user1" };
            const mockUser: string = "user1";
            httpClientSpy.get.and.returnValue(TestHelper.asyncData(expectedMessage));

            initialViewService.getUsernameValidation(mockUser).subscribe(
                (response: Message) => {
                    expect(response.title).toEqual(expectedMessage.title, "Title check");
                    expect(response.body).toEqual(expectedMessage.body, "body check");
                },
                fail,
            );

            expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
        });
    });
