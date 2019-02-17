import { expect } from "chai";
import { SceneDifferenceGenerator } from "./sceneDifferenceGenerator";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";

describe("SceneDifferenceGenerator", () => {
    const sceneMockValid: ICommonScene = {

    };

    const sphereMock: ICommonSceneObject = {

    }

    const cubeMock: ICommonSceneObject = {
        
    }
    describe("generateModifiedScene", () => {
        const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator();
        it("Should", () => {
            //differenceGenerator.generateModifiedScene()
        });
    });
});

