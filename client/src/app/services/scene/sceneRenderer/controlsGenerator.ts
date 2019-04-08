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

            const norm2D: number = Math.sqrt(vector.x * vector.x + vector.z * vector.z);
            const xTheta: number = Math.acos(vector.x / norm2D);
            const zTheta: number = Math.acos(vector.z / norm2D);

            if (!ControlsGenerator.isLocked) {
                switch (event.key) {
                    case "w":
                        // tslint:disable:max-line-length
                        ControlsGenerator.verifyCollisionWS(bbox, bboxCam, vector, true);
                        if (!ControlsGenerator.isCollision) {
                            ControlsGenerator.applyTranslationWS(camera, helper, cube, vector);
                        }
                        ControlsGenerator.isCollision = false;
                        break;
                    case "a":
                        ControlsGenerator.verifyCollisionAD(bbox, bboxCam, xTheta, zTheta, true);
                        if (!ControlsGenerator.isCollision) {
                            ControlsGenerator.applyTranslationAD(camera, helper, cube, xTheta, zTheta);
                        }
                        ControlsGenerator.isCollision = false;
                        break;
                    case "s":
                        ControlsGenerator.verifyCollisionWS(bbox, bboxCam, vector, false);
                        if (!ControlsGenerator.isCollision) {
                            ControlsGenerator.applyTranslationWS(camera, helper, cube, vector);
                        }
                        ControlsGenerator.isCollision = false;
                        break;
                    case "d":
                        ControlsGenerator.verifyCollisionAD(bbox, bboxCam, xTheta, zTheta, false);
                        if (!ControlsGenerator.isCollision) {
                            ControlsGenerator.applyTranslationAD(camera, helper, cube, xTheta, zTheta);
                        }
                        ControlsGenerator.isCollision = false;
                        break;
                    default:
                        break;
                }
            }
        });
    }
    private static verifyCollisionWS(bbox: THREE.Box3[], bboxCam: THREE.Box3, vector: THREE.Vector3,
                                     isForward: boolean): void {
        this.distance = (isForward) ? ControlsGenerator.DISTANCE_TO_MOVE : -ControlsGenerator.DISTANCE_TO_MOVE;
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

    private static verifyCollisionAD(bbox: THREE.Box3[], bboxCam: THREE.Box3, xTheta: number, zTheta: number,
                                     isLeft: boolean): void {
        this.distance = (isLeft) ? ControlsGenerator.DISTANCE_TO_MOVE : -ControlsGenerator.DISTANCE_TO_MOVE;
        bboxCam.translate(new THREE.Vector3(this.distance * Math.cos(zTheta),
                                            0,
                                            -this.distance * Math.cos(xTheta)));

        if (bbox) {
            for (let i: number = 0; i < bbox.length && !ControlsGenerator.isCollision; ++i) {
                if (bboxCam.intersectsBox(bbox[i])) {
                    ControlsGenerator.isCollision = true;
                    bboxCam.translate(new THREE.Vector3(-this.distance * Math.cos(zTheta),
                                                        0,
                                                        this.distance * Math.cos(xTheta)));
                }
            }
        }
    }

    private static applyTranslationWS(camera: THREE.PerspectiveCamera, helper: THREE.BoxHelper, cube: THREE.Mesh,
                                      vector: THREE.Vector3): void {
        cube.translateX(this.distance * vector.x);
        cube.translateY(this.distance * vector.y);
        cube.translateZ(this.distance * vector.z);

        helper.translateX(this.distance * vector.x);
        helper.translateY(this.distance * vector.y);
        helper.translateZ(this.distance * vector.z);

        camera.translateZ(-this.distance);
    }

    private static applyTranslationAD(camera: THREE.PerspectiveCamera, helper: THREE.BoxHelper, cube: THREE.Mesh,
                                      xTheta: number, zTheta: number): void {
        cube.translateZ(-Math.cos(xTheta));
        helper.translateZ(-Math.cos(xTheta));

        cube.translateX(Math.cos(zTheta));
        helper.translateX(Math.cos(zTheta));

        camera.translateX(-ControlsGenerator.DISTANCE_TO_MOVE);
    }
}
