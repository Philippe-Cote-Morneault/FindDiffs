import * as THREE from "three";

export class WallLoader {
    private static readonly SCENE_DEPTH: number = 140;
    private static readonly SCENE_HEIGHT: number = 30;
    private static readonly SCENE_WIDTH: number = 100;

    private static readonly WALL_DEPTH: number = 1;

    private static readonly WALL_POS_X: number = 45;
    private static readonly WALL_POS_Y: number = 15;
    private static readonly WALL_TOP_POS_Y: number = 30;
    private static readonly WALL_POS_Z: number = 65;

    public static async load(boundingBoxes: THREE.Box3[], scene: THREE.Scene): Promise<void> {
        const geometryD: THREE.BoxGeometry = new THREE.BoxGeometry(this.SCENE_WIDTH, this.SCENE_HEIGHT, this.WALL_DEPTH);
        const geometryW: THREE.BoxGeometry = new THREE.BoxGeometry(this.WALL_DEPTH, this.SCENE_HEIGHT, this.SCENE_DEPTH);
        const geometryH: THREE.BoxGeometry = new THREE.BoxGeometry(this.SCENE_WIDTH, this.WALL_DEPTH, this.SCENE_DEPTH);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });

        this.addWall(geometryD, material, boundingBoxes, scene, 0, this.WALL_POS_Y, -this.WALL_POS_Z);
        this.addWall(geometryD, material, boundingBoxes, scene, 0, this.WALL_POS_Y, this.WALL_POS_Z);
        this.addWall(geometryW, material, boundingBoxes, scene, this.WALL_POS_X, this.WALL_POS_Y, 0);
        this.addWall(geometryW, material, boundingBoxes, scene, -this.WALL_POS_X, this.WALL_POS_Y, 0);
        this.addWall(geometryH, material, boundingBoxes, scene, 0, this.WALL_TOP_POS_Y, 0);
        this.addWall(geometryH, material, boundingBoxes, scene, 0, 0, 0);
    }

    private static addWall(geometry: THREE.BoxGeometry, material: THREE.MeshBasicMaterial,
                           boundingBoxes: THREE.Box3[], scene: THREE.Scene, posX: number,
                           posY: number, posZ: number): void {
        const wall: THREE.Mesh = new THREE.Mesh(geometry, material);
        wall.position.set(posX, posY, posZ);

        //Test pour voir les murs
        // const color: THREE.Color = new THREE.Color(0x00FF00);
        // const helper: THREE.BoxHelper = new THREE.BoxHelper(wall, color);
        // scene.add(helper);

        const box3dside1: THREE.Box3 = new THREE.Box3();
        box3dside1.setFromObject(wall);
        boundingBoxes.push(box3dside1);
    }
}
