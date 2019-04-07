import * as THREE from "three";

export class ControlsGenerator {
    public static isLocked: boolean = true;
    public static isCollision: boolean = false;
    public static distance: number = 0;
    private static readonly DISTANCE_TO_MOVE: number = 1;

    // tslint:disable:max-func-body-length
    public static generateGameControls(camera: THREE.PerspectiveCamera, helper: THREE.BoxHelper, cube: THREE.Mesh, bbox: THREE.Box3[],
                                       bboxCam: THREE.Box3, canvas: HTMLElement): void {
        // console.log(bbox);
        // tslint:disable-next-line:cyclomatic-complexity
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            // console.log(bbox);
            const vector: THREE.Vector3 = new THREE.Vector3(); // create once and reuse it!
            camera.getWorldDirection(vector);

            const norm: number = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
            const xTheta: number = Math.acos(vector.x / norm);
            const yTheta: number = Math.acos(vector.y / norm);
            const zTheta: number = Math.acos(vector.z / norm);

            if (!ControlsGenerator.isLocked) {
                switch (event.key) {
                    case "w":
                        // tslint:disable:max-line-length
                        ControlsGenerator.verifyCollision(bbox, bboxCam, vector, true);
                        if (!ControlsGenerator.isCollision) {
                            ControlsGenerator.applyTranslation(camera, helper, cube, vector);
                        }
                        ControlsGenerator.isCollision = false;
                        break;
                    case "a":
                        const vector2: THREE.Vector3 = new THREE.Vector3(vector.z, 0, vector.x);
                        bboxCam.translate(new THREE.Vector3(ControlsGenerator.DISTANCE_TO_MOVE * vector2.x + vector.y * Math.cos(zTheta),
                                                            0,
                                                            -ControlsGenerator.DISTANCE_TO_MOVE * vector2.z - vector.y * Math.cos(xTheta)));

                        if (bbox) {
                            for (let i: number = 0; i < bbox.length && !ControlsGenerator.isCollision; ++i) {
                                if (bboxCam.intersectsBox(bbox[i])) {
                                    ControlsGenerator.isCollision = true;
                                    bboxCam.translate(new THREE.Vector3(-ControlsGenerator.DISTANCE_TO_MOVE * vector2.x,
                                                                        0,
                                                                        ControlsGenerator.DISTANCE_TO_MOVE * vector2.z));
                                }
                            }

                            if (!ControlsGenerator.isCollision) {
                                const vectTemp: THREE.Vector3 = new THREE.Vector3();
                                cube.getWorldDirection(vectTemp);

                                cube.translateZ(-Math.cos(xTheta) - Math.cos(yTheta));
                                helper.translateZ(-Math.cos(xTheta) + Math.cos(yTheta));

                                cube.translateX((Math.cos(zTheta)));
                                helper.translateX((Math.cos(zTheta)));
                                console.log((Math.cos(xTheta)));
                                console.log(-Math.cos(xTheta) - Math.cos(yTheta));
                                // console.log(-Math.cos(xTheta));
                                // console.log(Math.sin(xTheta));
                                // console.log(-(1 - Math.cos(xTheta)));
                                // console.log(-Math.cos(xTheta));
                                // console.log(vectTemp.z);
                                // console.log(vector.z);
                                // console.log(vectTemp.z - vector.z);
                                // console.log(vectTemp.x - vector.x);
                                // cube.translateX(-ControlsGenerator.DISTANCE_TO_MOVE * Math.abs((1 - Math.cos(xTheta))));
                                // cube.translateZ(-ControlsGenerator.DISTANCE_TO_MOVE * (Math.cos(xTheta)));

                                // helper.translateX(ControlsGenerator.DISTANCE_TO_MOVE * Math.abs((1 - Math.cos(xTheta))));
                                // helper.translateZ(-ControlsGenerator.DISTANCE_TO_MOVE * (Math.cos(xTheta)));

                                camera.translateX(-ControlsGenerator.DISTANCE_TO_MOVE);
                            }
                            ControlsGenerator.isCollision = false;
                        }
                        break;
                    case "s":
                        ControlsGenerator.verifyCollision(bbox, bboxCam, vector, false);
                        if (!ControlsGenerator.isCollision) {
                            ControlsGenerator.applyTranslation(camera, helper, cube, vector);
                        }
                        ControlsGenerator.isCollision = false;
                        break;
                    case "d":
                        const vector3: THREE.Vector3 = new THREE.Vector3(vector.z, vector.y, vector.x);
                        bboxCam.translate(new THREE.Vector3(-ControlsGenerator.DISTANCE_TO_MOVE * vector3.x,
                                                            ControlsGenerator.DISTANCE_TO_MOVE * vector3.y,
                                                            ControlsGenerator.DISTANCE_TO_MOVE * vector3.z));

                        if (bbox) {
                            for (let i: number = 0; i < bbox.length && !ControlsGenerator.isCollision; ++i) {
                                if (bboxCam.intersectsBox(bbox[i])) {
                                    ControlsGenerator.isCollision = true;
                                    bboxCam.translate(new THREE.Vector3(ControlsGenerator.DISTANCE_TO_MOVE * vector3.x,
                                                                        ControlsGenerator.DISTANCE_TO_MOVE * vector3.y,
                                                                        -ControlsGenerator.DISTANCE_TO_MOVE * vector3.z));
                                }
                            }
                            if (!ControlsGenerator.isCollision) {
                                cube.translateX(-ControlsGenerator.DISTANCE_TO_MOVE * vector3.x);
                                cube.translateY(ControlsGenerator.DISTANCE_TO_MOVE * vector3.y);
                                cube.translateZ(ControlsGenerator.DISTANCE_TO_MOVE * vector3.z);

                                helper.translateX(-ControlsGenerator.DISTANCE_TO_MOVE * vector3.x);
                                helper.translateY(ControlsGenerator.DISTANCE_TO_MOVE * vector3.y);
                                helper.translateZ(ControlsGenerator.DISTANCE_TO_MOVE * vector3.z);

                                camera.translateX(ControlsGenerator.DISTANCE_TO_MOVE);
                            }
                            ControlsGenerator.isCollision = false;
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    }
    private static verifyCollision(bbox: THREE.Box3[], bboxCam: THREE.Box3, vector: THREE.Vector3,
                                   isForward: boolean): void {
        this.distance = (!isForward) ? -ControlsGenerator.DISTANCE_TO_MOVE : ControlsGenerator.DISTANCE_TO_MOVE;
        bboxCam.translate(new THREE.Vector3(this.distance * vector.x,
                                            this.distance * vector.y,
                                            this.distance * vector.z));
        if (bbox) {
            for (let i: number = 0; i < bbox.length && !ControlsGenerator.isCollision; ++i) {
                if (bboxCam.intersectsBox(bbox[i])) {
                    ControlsGenerator.isCollision = true;
                    bboxCam.translate(new THREE.Vector3(-this.distance * vector.x,
                                                        -this.distance * vector.y,
                                                        -this.distance * vector.z));
                }
            }
        }
    }

    private static applyTranslation(camera: THREE.PerspectiveCamera, helper: THREE.BoxHelper, cube: THREE.Mesh,
                                    vector: THREE.Vector3): void {
        cube.translateX(this.distance * vector.x);
        cube.translateY(this.distance * vector.y);
        cube.translateZ(this.distance * vector.z);

        helper.translateX(this.distance * vector.x);
        helper.translateY(this.distance * vector.y);
        helper.translateZ(this.distance * vector.z);

        camera.translateZ(-this.distance);
    }
}
