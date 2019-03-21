import { ICommonThematicObject } from "../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { ICommonThematicScene, ObjectType } from "../../../../../common/model/scene/scene";
import * as MOCKS from "./thematicObjectMocks";

const sceneObjects: ICommonThematicObject[] = [
    MOCKS.bin, MOCKS.cone, MOCKS.eclispe, MOCKS.lambo, MOCKS.lamp, MOCKS.lexus,
    MOCKS.meter, MOCKS.signForbidden, MOCKS.signSkip, MOCKS.signStop,
];

export const thematicScene: ICommonThematicScene = {
    id: "3rfdsf43",
    dimensions: {
        x: 300,
        y: 200,
        z: 300,
    },
    type: ObjectType.Geometric,
    sceneObjects: sceneObjects,
    texture: "default",
};
