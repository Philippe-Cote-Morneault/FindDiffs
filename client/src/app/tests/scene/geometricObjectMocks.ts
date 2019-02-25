import { ICommonCone } from "../../../../../common/model/scene/objects/geometricObjects/cone";
import { ICommonCube } from "../../../../../common/model/scene/objects/geometricObjects/cube";
import { ICommonCylinder } from "../../../../../common/model/scene/objects/geometricObjects/cylinder";
import { GeometricShapeType } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonPyramid } from "../../../../../common/model/scene/objects/geometricObjects/pyramid";
import { ICommonSphere } from "../../../../../common/model/scene/objects/geometricObjects/sphere";
import { ObjectType } from "../../../../../common/model/scene/scene";

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

export const cube3: ICommonCube = {
    id: "kjhdhgfdsfdsf",
    position: {
        x: -104,
        y: -40,
        z: 60,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x12311,
    shapeType: GeometricShapeType.CUBE,
    width: 2,
};

export const cylinder1: ICommonCylinder = {
    id: "hgfhfsadfsf",
    position: {
        x: 104,
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
    shapeType: GeometricShapeType.CYLINDER,
    radius: 4,
    height: 8,
};

export const cylinder2: ICommonCylinder =  {
    id: "retetreretre",
    position: {
        x: 104,
        y: -40,
        z: 60,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x123,
    shapeType: GeometricShapeType.CYLINDER,
    radius: 5,
    height: 13,
};

export const cylinder3: ICommonCylinder =  {
    id: "retetreretre",
    position: {
        x: -104,
        y: -40,
        z: 60,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x123,
    shapeType: GeometricShapeType.CYLINDER,
    radius: 2,
    height: 13,
};
export const pyramid1: ICommonPyramid = {
    id: "hgfhgfhfhds",
    position: {
        x: 104,
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
    shapeType: GeometricShapeType.TRIANGULAR_BASE_PYRAMID,
    radiusBase: 5,
    height: 8,
};

export const pyramid2: ICommonPyramid = {
    id: "tgffdfdsfsdfsfdg4353",
    position: {
        x: -150,
        y: 24,
        z: 60,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x43343,
    shapeType: GeometricShapeType.TRIANGULAR_BASE_PYRAMID,
    radiusBase: 4,
    height: 7,
};

export const pyramid3: ICommonPyramid = {
    id: "fdsfdsfs",
    position: {
        x: -150,
        y: 24,
        z: 60,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x43346663,
    shapeType: GeometricShapeType.TRIANGULAR_BASE_PYRAMID,
    radiusBase: 8,
    height: 7,
};

export const sphere1: ICommonSphere =  {
    id: "tgfd345trgg4353",
    position: {
        x: 104,
        y: 40,
        z: 60,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 200,
        zAngle: 1,
    },
    color: 0x34324,
    shapeType: GeometricShapeType.SPHERE,
    radius: 9,
};

export const sphere2: ICommonSphere = {
    id: "gdfgdg",
    position: {
        x: 0,
        y: 0,
        z: 0,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x16543,
    shapeType: GeometricShapeType.SPHERE,
    radius: 10,
};

export const sphere3: ICommonSphere = {
    id: "gdfgretredg",
    position: {
        x: 100,
        y: 0,
        z: 0,
    },
    type: ObjectType.Geometric,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    color: 0x163343,
    shapeType: GeometricShapeType.SPHERE,
    radius: 50,
};