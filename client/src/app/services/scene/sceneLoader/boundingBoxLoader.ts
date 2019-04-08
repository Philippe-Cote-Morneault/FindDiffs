import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";

export class BoundingBoxLoader {
    private static readonly BOTTOM_BOX_WIDTH_DEPTH: number = 0.48;
    private static readonly BOTTOM_BOX_HEIGHT: number = 9;
    private static readonly TOP_BOX_WIDTH_MULTIPLIER: number = 6;
    private static readonly TOP_BOX_HEIGHT_MULTIPLIER: number = 1.3;
    private static readonly TOP_BOX_DEPTH_MULTIPLIER: number = 0.1;
    private static readonly TOP_BOX_POS_Y: number = 5.2;

    public static async loadLamp(boundingBoxes: THREE.Box3[], sceneObjects: ICommonSceneObject[],
                                 element: THREE.Object3D, index: number): Promise<void> {
        const box3dBottom: THREE.Box3 = new THREE.Box3();
        const box3dTop: THREE.Box3 = new THREE.Box3();

        const geometryBottom: THREE.BoxGeometry = new THREE.BoxGeometry( this.BOTTOM_BOX_WIDTH_DEPTH,
                                                                         (element.position.y + this.BOTTOM_BOX_HEIGHT) * element.scale.y,
                                                                         this.BOTTOM_BOX_WIDTH_DEPTH );
        const geometryTop: THREE.BoxGeometry = new THREE.BoxGeometry( this.TOP_BOX_WIDTH_MULTIPLIER * element.scale.x,
                                                                      this.TOP_BOX_HEIGHT_MULTIPLIER * element.scale.y,
                                                                      this.TOP_BOX_DEPTH_MULTIPLIER * element.scale.z);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( {color: 0x00FF00} );
        const cubeBottom: THREE.Mesh = new THREE.Mesh( geometryBottom, material );
        const cubeTop: THREE.Mesh = new THREE.Mesh( geometryTop, material );

        cubeBottom.position.set(element.position.x, element.position.y, element.position.z);
        cubeTop.position.set(element.position.x, (element.position.y + this.TOP_BOX_POS_Y) * element.scale.y, element.position.z);
        cubeTop.rotation.y = sceneObjects[index].orientation.yAngle;

        box3dBottom.setFromObject(cubeBottom);
        box3dTop.setFromObject(cubeTop);

        boundingBoxes.push(box3dBottom);
        boundingBoxes.push(box3dTop);
    }

    public static async loadObject(boundingBoxes: THREE.Box3[], element: THREE.Object3D): Promise<void> {
            const box3d: THREE.Box3 = new THREE.Box3();
            box3d.setFromObject(element);

            // TODO: remove
            // const color: THREE.Color = new THREE.Color(0xffff00);
            // const helper: THREE.BoxHelper = new THREE.BoxHelper(element, color);
            // scene.add(helper);
            boundingBoxes.push(box3d);
    }

    public static async loadCamera(scene: THREE.Scene, camera: THREE.PerspectiveCamera): Promise<Object> {
        const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( );
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( {color: 0x00F00} );
        const cubeCam: THREE.Mesh = new THREE.Mesh( geometry, material );
        cubeCam.position.set(camera.position.x, camera.position.y, camera.position.z);

        const bboxCam: THREE.Box3 = new THREE.Box3().setFromObject(cubeCam);
        const helper: THREE.BoxHelper = new THREE.BoxHelper(cubeCam);
        scene.add(cubeCam);
        scene.add(helper);

        return {helper: helper, cube: cubeCam, bbox: bboxCam};
    }
}
