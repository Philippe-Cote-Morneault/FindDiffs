import { ICommonScene } from "../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { TestHelper } from "../../test.helper";
import { ScenePairService } from "./scene-pair.service";

// tslint:disable:no-magic-numbers
// tslint:disable:no-any Used to mock the http call
let httpClientSpyPost: any;
let scenePairService: ScenePairService;

describe("UserService", () => {

    beforeEach(() => {
        httpClientSpyPost = jasmine.createSpyObj("HttpClient", ["post"]);
        scenePairService = new ScenePairService(httpClientSpyPost);
    });

    it("should return expected message on addScenePair request (HttpClient called once)", () => {
        const expectedResponse: Object = {"bg_color": "red", "dimensions": 2, "id": "928374" , "sceneObject": "scene", "texture": "none"};
        const mockType: string = "Geometry";
        const mockQty: number = 2;
        httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedResponse));

        scenePairService.addScenePair(mockType, mockQty).subscribe(
            (response: ICommonScene) => {
                expect(response.id).toEqual("928374");
                expect(response.bg_color).toEqual("red");
            },
            fail,
        );

        expect(httpClientSpyPost.post.calls.count()).toBe(1, "one call");
    });
    it("should return expected message on modifyScenePair request (HttpClient called once)", () => {
        const expectedResponse: Object = {"addedObjects": ["132342"], "colorChangedObjects": [{key: "3243", value: 3232323}],
                                          "deletedObjects": ["323232"] , "id": "123098"};
        const mockId: string = "123098";
        const mockAdd: boolean = true;
        const mockRemove: boolean = true;
        const mockColor: boolean = false;

        httpClientSpyPost.post.and.returnValue(TestHelper.asyncData(expectedResponse));

        scenePairService.modifyScenePair(mockId, mockAdd, mockRemove, mockColor).subscribe(
            (response: ICommonSceneModifications) => {
                expect(response.id).toEqual("123098");
            },
            fail,
        );

        expect(httpClientSpyPost.post.calls.count()).toBe(1, "one call");
    });

});
