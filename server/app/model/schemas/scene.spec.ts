import { expect } from "chai";
import * as validUrl from "valid-url";
import { IScene, Scene } from "./scene";
describe("Scene Schema", () => {
    const propertiesToTest: string[] = [
        "url_thumbnail",
    ];

    propertiesToTest.forEach((propertyToTest: string) => {
        describe(`.${propertyToTest}`, () => {
            it("Should return a properly formatted url", () => {
                const scene: IScene = new Scene({
                    scene: undefined,
                    grid: undefined,
                    modifications: undefined,
                    file_thumbnail_id: "anid",
                    creation_date: new Date(),
                });
                expect(validUrl.isUri(scene[propertyToTest])).to.not.equal(undefined);

            });

            it("Should not have a tralling slash", () => {
                const scene: IScene = new Scene({
                    scene: undefined,
                    grid: undefined,
                    modifications: undefined,
                    file_thumbnail_id: "anid",
                    creation_date: new Date(),
                });
                const url: string = scene[propertyToTest];
                expect(url.charAt(url.length - 1)).to.not.equal("/");
            });
        });
    });

});
