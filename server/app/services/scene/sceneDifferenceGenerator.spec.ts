import { expect } from "chai";
import { ICommon3DPosition } from "../../../../common/model/positions";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { GeometricShape, ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { SceneDifferenceGenerator } from "./sceneDifferenceGenerator";

describe("SceneDifferenceGenerator", () => {
    const sceneObjects: ICommonSceneObject[] = [
        {
            id: "1",
            color: 293,
            dimensions: [2, 2, 3],
            type: GeometricShape.CUBE,
            position: {
                x: 10,
                y: 20,
                z: 5,
            },
            texture: null,
        },
    ];

    const originalScene: ICommonScene = {

    }
    describe("generateModifiedScene", () => {
        const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator();
    });
});
