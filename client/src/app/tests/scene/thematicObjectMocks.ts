import { ICommonThematicObject, ObjTheme } from "../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { ObjectType } from "../../../../../common/model/scene/scene";

export const meter: ICommonThematicObject = {
    id: "sf34fsdfs",
    position: {
        x: 34,
        y: 120,
        z: 0,
    },
    type: ObjectType.Thematic,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    isTextured: true,
    texture: "meter_1.jpg",
    scale: 1,
    objectType: ObjTheme.METER,
};

export const bin: ICommonThematicObject = {
    id: "435435wdc",
    position: {
        x: 104,
        y: 140,
        z: 60,
    },
    type: ObjectType.Thematic,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    isTextured: true,
    texture: "bin_1.jpg",
    scale: 0.5,
    objectType: ObjTheme.BIN,
};

export const cone: ICommonThematicObject = {
    id: "fsdfsf34536uyjh",
    position: {
        x: 174,
        y: 140,
        z: -60,
    },
    type: ObjectType.Thematic,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    isTextured: true,
    texture: "cone_1.jpg",
    scale: 2,
    objectType: ObjTheme.CONE,
};

export const eclispe: ICommonThematicObject = {
    id: "sddsdsdsdsddsfdsfsfds",
    position: {
        x: 104,
        y: 40,
        z: -60,
    },
    type: ObjectType.Thematic,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    isTextured: true,
    texture: "eclipse_1.jpg",
    scale: 1,
    objectType: ObjTheme.ECLIPSE,
};

export const lambo: ICommonThematicObject = {
    id: "kjhdhgf",
    position: {
        x: -104,
        y: 40,
        z: 60,
    },
    type: ObjectType.Thematic,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    isTextured: true,
    texture: "lambo_1.jpg",
    scale: 0.5,
    objectType: ObjTheme.LAMBO,
};

export const lamp: ICommonThematicObject = {
    id: "kjhdhgfdsfdsf",
    position: {
        x: -104,
        y: -40,
        z: 60,
    },
    type: ObjectType.Thematic,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    isTextured: false,
    color: 0xCCCCCC,
    scale: 2,
    objectType: ObjTheme.LAMP,
};

export const lexus: ICommonThematicObject = {
    id: "hgfhfsadfsf",
    position: {
        x: 104,
        y: 40,
        z: 60,
    },
    type: ObjectType.Thematic,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    isTextured: false,
    color: 0xFC151B,
    scale: 1,
    objectType: ObjTheme.LEXUS,
};

export const signSkip: ICommonThematicObject = {
    id: "retetreretre",
    position: {
        x: 104,
        y: -40,
        z: 60,
    },
    type: ObjectType.Thematic,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    isTextured: true,
    texture: "sign_skip1_1.jpg",
    scale: 1,
    objectType: ObjTheme.SIGN_SKIP,
};

export const signStop: ICommonThematicObject = {
    id: "retetreretre",
    position: {
        x: -104,
        y: -40,
        z: 60,
    },
    type: ObjectType.Thematic,
    orientation: {
        xAngle: 4,
        yAngle: 0,
        zAngle: 1,
    },
    isTextured: true,
    texture: "sign_stop_1.jpg",
    scale: 3,
    objectType: ObjTheme.SIGN_STOP,
};

export const signForbidden: ICommonThematicObject = {
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
    isTextured: true,
    texture: "sign_forbidden_1.jpg",
    scale: 5,
    objectType: ObjTheme.SIGN_FORBIDDEN,
};
