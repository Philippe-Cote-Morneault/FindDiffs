import { ThemeSurface } from "./thematicObject";

interface IObjectsProperties {
    lamp: ObjectProperties;
    bench: ObjectProperties;
    bin: ObjectProperties;
    cone: ObjectProperties;
    eclipse: ObjectProperties;
    lambo: ObjectProperties;
    lexus: ObjectProperties;
    sign_forbidden: ObjectProperties;
    sign_skip: ObjectProperties;
    sign_stop: ObjectProperties;
    [key: string]: ObjectProperties;
 }
 interface ObjectProperties {
    isTextured: boolean;
    meshName: string;
    texture?: string[];
    color?: number[];

    spawnSurface: ThemeSurface[];
 }
 export const ObjectProperties: IObjectsProperties = {
    bench: {
        isTextured: false,
        meshName: "support",
        color: [0xcba345, 0xca1e29, 0x4aca2f],
        spawnSurface: [ThemeSurface.GRASS],
    },
    bin: {
        isTextured: true,
        meshName: "bin",
        texture: [
            "bin_1.jpg",
            "bin_2.jpg",
            "bin_3.jpg",
        ],
        spawnSurface: [ThemeSurface.GRASS, ThemeSurface.PARKING],
    },
    cone: {
        isTextured: true,
        meshName: "H1",
        texture: [
            "cone_1.jpg",
            "cone_2.jpg",
            "cone_3.jpg",
        ],
        spawnSurface: [ThemeSurface.PARKING],
    },
    eclipse: {
        isTextured: true,
        meshName: "2003eclipse",
        texture: [
            "eclipse_1.jpg",
            "eclipse_2.jpg",
            "eclipse_3.jpg",
        ],
        spawnSurface: [ThemeSurface.CAR],
    },
    lambo: {
        isTextured: true,
        meshName: "Body",
        texture: [
            "lambo_1.jpg",
            "lambo_2.jpg",
            "lambo_3.jpg",
        ],
        spawnSurface: [ThemeSurface.CAR],
    },
    lamp:{
        isTextured: true,
        meshName: "lampPost",
        texture: [
            "aluminum_1.png",
            "aluminum_2.png",
            "aluminum_3.png",
        ],
        spawnSurface: [ThemeSurface.GRASS],
    },
    lexus:{
        isTextured: false,
        meshName: "ID56_1",
        color:[0xfc151b, 0x00ff00, 0x000000],
        spawnSurface: [ThemeSurface.CAR],
    },
    sign_forbidden: {
        isTextured: true,
        meshName: "fond_panneau_interdit01_0",
        texture: [
            "sign_forbidden_1.jpg",
            "sign_forbidden_2.jpg",
            "sign_forbidden_3.jpg",
        ],
        spawnSurface: [ThemeSurface.GRASS],
    },
    sign_skip: {
        isTextured: true,
        meshName: "Plane04_0",
        texture: [
            "sign_skip1_1.jpg",
            "sign_skip1_2.jpg",
            "sign_skip1_3.jpg",
        ],
        spawnSurface: [ThemeSurface.GRASS],
    },
    sign_stop: {
        isTextured: true,
        meshName: "Cylinder74_0",
        texture: [
            "sign_stop_1.jpg",
            "sign_stop_2.jpg",
            "sign_stop_3.jpg",
        ],
        spawnSurface: [ThemeSurface.GRASS],
    }
 }