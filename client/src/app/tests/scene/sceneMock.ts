import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonGeometricScene, ObjectType } from "../../../../../common/model/scene/scene";
import * as MOCKS from "./geometricObjectMocks";

const sceneObjects: ICommonGeometricObject[] = [
    MOCKS.cube1, MOCKS.cube2, MOCKS.cylinder1, MOCKS.cylinder2, MOCKS.sphere1, MOCKS.sphere2,
    MOCKS.cone1, MOCKS.cone2, MOCKS.pyramid1, MOCKS.pyramid2,
];

export const scene: ICommonGeometricScene = {
    id: "3rfdsf43",
    dimensions: {
        x: 300,
        y: 200,
        z: 300,
    },
    bg_color: 0x123454,
    type: ObjectType.Geometric,
    sceneObjects: sceneObjects,
};