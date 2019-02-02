import { Message } from "../../../common/communication/message";
import { User } from "../../../common/communication/user";
import { TestHelper } from "../test.helper";
import { InitialViewService } from "./initial-view.service";

// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpyPost: any;
// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpyDelete: any;
let initialViewServicePost: InitialViewService;
let initialViewServiceDelete: InitialViewService;

describe("InitialViewService", () => {

        beforeEach(() => {
            httpClientSpyPost = jasmine.createSpyObj("HttpClient", ["post"]);
            httpClientSpyDelete = jasmine.createSpyObj("HttpClient", ["delete"]);
            initialViewServicePost = new InitialViewService(httpClientSpyPost);
            initialViewServiceDelete = new InitialViewService(httpClientSpyDelete);
        });

        it("should return expected message on verifyUsername request (HttpClient called once)", () => {
            const expectedUser: User = { id: "1", username: "user1" };
            const mockUsername: string = "user1";
            httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedUser));

            initialViewServicePost.postUsernameValidation(mockUsername).subscribe(
                (response: User) => {
                    expect(response.id).toEqual(expectedUser.id, "Id check");
                    expect(response.username).toEqual(expectedUser.username, "Username check");
                },
                fail,
            );

            expect(httpClientSpyPost.post.calls.count()).toBe(1, "one call");
        });

        it("should return expected message on deleteUsername request (HttpClient called once)", () => {
            const expectedMessage: Message = { body: "UsernameDeleted", title: "user1" };
            const mockUserId: string = "user1";
            httpClientSpyDelete.delete.and.returnValue(TestHelper.asyncData(expectedMessage));

            initialViewServiceDelete.deleteUsername(mockUserId).subscribe(
                (response: Message) => {
                    expect(response.title).toEqual(expectedMessage.title, "Title check");
                    expect(response.body).toEqual(expectedMessage.body, "body check");
                },
                fail,
            );

            expect(httpClientSpyDelete.delete.calls.count()).toBe(1, "one call");
        });

    });
