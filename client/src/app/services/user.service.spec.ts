import { Message } from "../../../../common/communication/message";
import { User } from "../../../../common/communication/user";
import { TestHelper } from "../../test.helper";
import { UserService } from "./user.service";

// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpyPost: any;
// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpyDelete: any;
let userServicePost: UserService;
let userServiceDelete: UserService;

describe("UserService", () => {

        beforeEach(() => {
            httpClientSpyPost = jasmine.createSpyObj("HttpClient", ["post"]);
            httpClientSpyDelete = jasmine.createSpyObj("HttpClient", ["delete"]);
            userServicePost = new UserService(httpClientSpyPost);
            userServiceDelete = new UserService(httpClientSpyDelete);
        });

        it("should return expected message on verifyUsername request (HttpClient called once)", () => {
            const expectedUser: User = { id: "1", username: "user1" };
            const mockUsername: string = "user1";
            httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedUser));

            userServicePost.postUsernameValidation(mockUsername).subscribe(
                (response: User) => {
                    expect(response.id).toEqual(expectedUser.id, "Id check");
                    expect(response.username).toEqual(expectedUser.username, "Username check");
                },
                fail,
            );

            expect(httpClientSpyPost.post.calls.count()).toBe(1, "one call");
        });

        it("should return expected message on deleteUsername request (HttpClient called once)", () => {
            const expectedMessage: Message = { title: "UsernameDeleted", body: "user1" };
            const mockUserId: string = "user1";
            httpClientSpyDelete.delete.and.returnValue(TestHelper.asyncData(expectedMessage));

            userServiceDelete.deleteUsername(mockUserId).subscribe(
                (response: Message) => {
                    expect(response.title).toEqual(expectedMessage.title, "Title check");
                    expect(response.body).toEqual(expectedMessage.body, "body check");
                },
                fail,
            );

            expect(httpClientSpyDelete.delete.calls.count()).toBe(1, "one call");
        });

        it("should return an error", () => {
            const expectedMessageError: Message = { title: "Error", body: "There is already a user with the same username on the server" };
            const mockUsername: string = "user1";
            httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedMessageError));

            userServicePost.postUsernameValidation(mockUsername).subscribe();
            userServicePost.postUsernameValidation(mockUsername).subscribe((response: Message) => {
                expect(response.title).toEqual(expectedMessageError.title, "TitleCheck");
                expect(response.body).toEqual(expectedMessageError.body, "Body check");
            });
        });

    });
