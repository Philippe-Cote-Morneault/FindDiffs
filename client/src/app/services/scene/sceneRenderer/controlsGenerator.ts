import * as THREE from "three";

export class ControlsGenerator {
    public static isLocked: boolean = true;
    public static isCollision: boolean = false;
    private static readonly DISTANCE_TO_MOVE: number = 1;

    // tslint:disable:max-func-body-length
    public static generateGameControls(camera: THREE.PerspectiveCamera, helper: THREE.BoxHelper, cube: THREE.Mesh, bbox: THREE.Box3[],
                                       bboxCam: THREE.Box3, canvas: HTMLElement): void {
        // console.log(bbox);
        // tslint:disable-next-line:cyclomatic-complexity
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            // console.log(bbox);
            const vector: THREE.Vector3 = new THREE.Vector3(); // create once and reuse it!
            camera.getWorldDirection( vector );

            const norm: number = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
            const xTheta: number = Math.acos(vector.x / norm);
            const yTheta: number = Math.acos(vector.y / norm);
            const zTheta: number = Math.acos(vector.z / norm);

            console.log(vector);
            if (!ControlsGenerator.isLocked) {
                switch (event.key) {
                    case "w":
                        // let collision: boolean = false;
                        // for (let i: number = 0; i < length && !collision; i++) {
                        //     //Parcourir array box 3
                        //     // regarder si boxCamera touche au autre box?
                        //     if(true) {
                        //         collision = true;
                        //     }
                        // }
                        // Si oui canceller le mouvement
                            // Sinon avancer!!
                        bboxCam.translate(new THREE.Vector3(0, 0, -ControlsGenerator.DISTANCE_TO_MOVE));
                        if (bbox) {
                            for (let i: number = 0; i < bbox.length && !ControlsGenerator.isCollision; ++i) {
                                if (bboxCam.intersectsBox(bbox[i])) {
                                    ControlsGenerator.isCollision = true;
                                    bboxCam.translate(new THREE.Vector3(0, 0, ControlsGenerator.DISTANCE_TO_MOVE));
                                }
                            }
                            if (!ControlsGenerator.isCollision) {
                                cube.translateZ(-ControlsGenerator.DISTANCE_TO_MOVE);
                                helper.translateZ(-ControlsGenerator.DISTANCE_TO_MOVE);
                                camera.translateZ(-ControlsGenerator.DISTANCE_TO_MOVE);
                            }
                            ControlsGenerator.isCollision = false;
                        }
                        break;
                    case "a":
                        bboxCam.translate(new THREE.Vector3(-ControlsGenerator.DISTANCE_TO_MOVE, 0, 0));
                        // let isCollision: boolean = false;
                        if (bbox) {
                            for (let i: number = 0; i < bbox.length && !ControlsGenerator.isCollision; ++i) {
                                if (bboxCam.intersectsBox(bbox[i])) {
                                    ControlsGenerator.isCollision = true;
                                    bboxCam.translate(new THREE.Vector3(ControlsGenerator.DISTANCE_TO_MOVE, 0, 0));
                                }
                            }
                            if (!ControlsGenerator.isCollision) {
                                cube.translateX(-ControlsGenerator.DISTANCE_TO_MOVE);
                                helper.translateX(-ControlsGenerator.DISTANCE_TO_MOVE);
                                camera.translateX(-ControlsGenerator.DISTANCE_TO_MOVE);
                            }
                            ControlsGenerator.isCollision = false;
                        }
                        // camera.translateX(-ControlsGenerator.DISTANCE_TO_MOVE);
                        break;
                    case "s":

                        bboxCam.translate(new THREE.Vector3(0, 0, ControlsGenerator.DISTANCE_TO_MOVE));
                        // let isCollision: boolean = false;
                        if (bbox) {
                            for (let i: number = 0; i < bbox.length && !ControlsGenerator.isCollision; ++i) {
                                if (bboxCam.intersectsBox(bbox[i])) {
                                    ControlsGenerator.isCollision = true;
                                    bboxCam.translate(new THREE.Vector3(0, 0, -ControlsGenerator.DISTANCE_TO_MOVE));
                                }
                            }
                            if (!ControlsGenerator.isCollision) {
                                cube.translateZ(ControlsGenerator.DISTANCE_TO_MOVE);
                                helper.translateZ(ControlsGenerator.DISTANCE_TO_MOVE);
                                camera.translateZ(ControlsGenerator.DISTANCE_TO_MOVE);
                            }
                            ControlsGenerator.isCollision = false;
                        }
                        // camera.translateZ(ControlsGenerator.DISTANCE_TO_MOVE);
                        break;
                    case "d":
                        bboxCam.translate(new THREE.Vector3(ControlsGenerator.DISTANCE_TO_MOVE, 0, 0));
                        // let isCollision: boolean = false;
                        if (bbox) {
                            for (let i: number = 0; i < bbox.length && !ControlsGenerator.isCollision; ++i) {
                                if (bboxCam.intersectsBox(bbox[i])) {
                                    ControlsGenerator.isCollision = true;
                                    bboxCam.translate(new THREE.Vector3(-ControlsGenerator.DISTANCE_TO_MOVE, 0, 0));
                                }
                            }
                            if (!ControlsGenerator.isCollision) {
                                cube.translateX(ControlsGenerator.DISTANCE_TO_MOVE);
                                helper.translateX(ControlsGenerator.DISTANCE_TO_MOVE);
                                camera.translateX(ControlsGenerator.DISTANCE_TO_MOVE);
                            }
                            ControlsGenerator.isCollision = false;
                        }
                        // camera.translateX(ControlsGenerator.DISTANCE_TO_MOVE);
                        break;
                    default:
                        break;
                }
            }
        });
    }
}
