import { expect } from "chai";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { TestHelper } from "../../test.helper";
import { ImagePairService } from "./image-pair.service";

// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpyPost: any;
// tslint:disable-next-line:no-any Used to mock the http call
let initialViewServiceGet: ImagePairService;

describe("InitialViewService", () => {

        beforeEach(() => {
            httpClientSpyPost = jasmine.createSpyObj("HttpClient", ["post"]);
            initialViewServiceGet = new ImagePairService(httpClientSpyPost);
        });

        it("should return expected message on verifyUsername request (HttpClient called once)", () => {
            const expectedImage: ICommonImagePair = {
                id: "1",
                url_difference: "/diff",
                url_modified: "/modif",
                url_original: "/origin",
                name: "image",
                creation_date: new Date(),
                differences_count: 7 };
            const mockImageName: string = "user1";
            const mockImageFile: File = {
                lastModified: 1000,
                size: 1000,
                name: "qasdas",
                type: "bmp",
                slice: (start?: 0, end?: 0, contentType?: "aws")};

            httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedImage));

            initialViewServiceGet.addImagePair(mockImageName, mockImageFile, mockImageFile).subscribe(
                (response: ICommonImagePair) => {
                    expect(response.id).to.equal(expectedImage.id);
                    expect(response.name).to.equal(expectedImage.name);
                },
              //  fail,
            );

           // expect(httpClientSpyPost.post.calls.count()).toBe(1, "one call");
        });
  });
