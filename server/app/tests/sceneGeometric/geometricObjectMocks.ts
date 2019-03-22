import { ICommonCone } from "../../../../common/model/scene/objects/geometricObjects/cone";
import { ICommonCube } from "../../../../common/model/scene/objects/geometricObjects/cube";
import { ICommonCylinder } from "../../../../common/model/scene/objects/geometricObjects/cylinder";
import { GeometricShapeType } from "../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonPyramid } from "../../../../common/model/scene/objects/geometricObjects/pyramid";
import { ICommonSphere } from "../../../../common/model/scene/objects/geometricObjects/sphere";
import { ObjectType } from "../../../../common/model/scene/scene";

export const cone1: ICommonCone = {
    id: "sf34fsdfs",
    position: {
        x: 34,
        y: 120,
        z: 0,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x123,
    shapeType: GeometricShapeType.CONE,
    radius: 5,
    height: 10,
};

export const cone2: ICommonCone = {
    id: "435435wdc",
    position: {
        x: 104,
        y: 140,
        z: 60,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x123,
    shapeType: GeometricShapeType.CONE,
    radius: 3,
    height: 7,
};

export const cone3: ICommonCone = {
    id: "fsdfsf34536uyjh",
    position: {
        x: 174,
        y: 140,
        z: -60,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x1211113,
    shapeType: GeometricShapeType.CONE,
    radius: 7,
    height: 7,
};

export const cube1: ICommonCube = {
    id: "sddsdsdsdsddsfdsfsfds",
    position: {
        x: 104,
        y: 40,
        z: -60,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x123,
    shapeType: GeometricShapeType.CUBE,
    width: 6,
};

export const cube2: ICommonCube = {
    id: "kjhdhgf",
    position: {
        x: -104,
        y: 40,
        z: 60,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x123,
    shapeType: GeometricShapeType.CUBE,
    width: 5,
};
