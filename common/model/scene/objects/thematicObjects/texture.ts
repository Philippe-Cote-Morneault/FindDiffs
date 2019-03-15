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
 }
 interface ObjectProperties {
    isTextured: boolean;
    texture?: string[];
    color?: number[];
 }
 export const ObjectsRefTheme: IObjectsProperties = {
    bench: {
        isTextured: false,
        color: [0xcba345, 0xca1e29, 0x4aca2f],
    },
    bin: {
        isTextured: true,
        texture: [
            "bin_1.jpg",
            "bin_2.jpg",
            "bin_3.jpg",
        ],
    },
    cone: {
        isTextured: true,
        texture: [
            "cone_1.jpg",
            "cone_2.jpg",
            "cone_3.jpg",
        ],
    },
    eclipse: {
        isTextured: true,
        texture: [
            "eclipse_1.jpg",
            "eclipse_2.jpg",
            "eclipse_3.jpg",
        ],
    },
    lambo: {
        isTextured: true,
        texture: [
            "lambo_1.jpg",
            "lambo_2.jpg",
            "lambo_3.jpg",
        ],
    },
    lamp:{
        isTextured: true,
        texture: [
            "aluminum_1.png",
            "aluminum_2.png",
            "aluminum_3.png",
        ],
    },
    lexus:{
        isTextured: false,
        color:[0xfc151b, 0xffffff, 0x000000],
    },
    sign_forbidden: {
        isTextured: true,
        texture: [
            "sign_forbidden_1.jpg",
            "sign_forbidden_2.jpg",
            "sign_forbidden_3.jpg",
        ],
    },
    sign_skip1: {
        isTextured: true,
        texture: [
            "sign_skip1_1.jpg",
            "sign_skip1_2.jpg",
            "sign_skip1_3.jpg",
        ]
 },
    sign_skip2: {
        isTextured: true,
        texture: [
            "sign_skip2_1.jpg",
            "sign_skip2_2.jpg",
            "sign_skip2_3.jpg",
        ],
    },
    sign_stop: {
        isTextured: true,
        texture: [
            "sign_stop_1.jpg",
            "sign_stop_2.jpg",
            "sign_stop_3.jpg",
        ],
    }
 }