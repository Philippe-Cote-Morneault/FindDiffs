import { expect } from "chai";
import * as validUrl from "valid-url";
import { ImagePair, IImagePair } from "./imagePair";
describe("ImagePair Schema", () => {
    const propertiesToTest: string[] = [
        "url_difference",
        "url_modified",
        "url_original",
    ];

    propertiesToTest.forEach((propertyToTest: string) => {
        describe(`.${propertyToTest}`, () => {
            it("Should return a properly formatted url", () => {
                const imagePair: IImagePair = new ImagePair({
                    name: "a funny name",
                    creation_date: new Date(),
                    differences_count: 0,
                    file_original_id: "id",
                    file_modified_id: "id",
                    file_difference_id: "id",
                });
                expect(validUrl.isUri(imagePair[propertyToTest])).to.not.equal(undefined);

            });

            it("Should not have a tralling slash", () => {
                const user: IImagePair = new ImagePair({
                    name: "a funny name",
                    creation_date: new Date(),
                    differences_count: 0,
                    file_original_id: "id",
                    file_modified_id: "id",
                    file_difference_id: "id",
                });
                const url: string = user[propertyToTest];
                expect(url.charAt(url.length - 1)).to.not.equal("/");
            });
        });
    });

});
