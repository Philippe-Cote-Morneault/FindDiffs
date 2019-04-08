import * as THREE from "three";

export class WallLoader {
    private static readonly SCENE_DEPTH_T: number = 140;
    private static readonly SCENE_HEIGHT_T: number = 30;
    private static readonly SCENE_WIDTH_T: number = 100;
    private static readonly SCENE_DEPTH_WIDTH_G: number = 250;
    private static readonly SCENE_HEIGHT_G: number = 125;

    private static readonly WALL_POS_X_T: number = 45;
    private static readonly WALL_POS_Y_T: number = 15;
    private static readonly WALL_TOP_POS_Y_T: number = 30;
    private static readonly WALL_POS_Z_T: number = 65;
    private static readonly WALL_POS_Y_G: number = 63;
    private static readonly WALL_POS_XZ_G: number = 125;

    private static readonly WALL_DEPTH: number = 1;

    public static async loadThematic(boundingBoxes: THREE.Box3[]): Promise<void> {
        const geometryD: THREE.BoxGeometry = new THREE.BoxGeometry(this.SCENE_WIDTH_T, this.SCENE_HEIGHT_T, this.WALL_DEPTH);
        const geometryW: THREE.BoxGeometry = new THREE.BoxGeometry(this.WALL_DEPTH, this.SCENE_HEIGHT_T, this.SCENE_DEPTH_T);
        const geometryH: THREE.BoxGeometry = new THREE.BoxGeometry(this.SCENE_WIDTH_T, this.WALL_DEPTH, this.SCENE_DEPTH_T);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });

        this.addWall(geometryD, material, boundingBoxes, 0, this.WALL_POS_Y_T, -this.WALL_POS_Z_T);
        this.addWall(geometryD, material, boundingBoxes, 0, this.WALL_POS_Y_T, this.WALL_POS_Z_T);
        this.addWall(geometryW, material, boundingBoxes, this.WALL_POS_X_T, this.WALL_POS_Y_T, 0);
        this.addWall(geometryW, material, boundingBoxes, -this.WALL_POS_X_T, this.WALL_POS_Y_T, 0);
        this.addWall(geometryH, material, boundingBoxes, 0, this.WALL_TOP_POS_Y_T, 0);
        this.addWall(geometryH, material, boundingBoxes, 0, 0, 0);
    }

    public static async loadGeometric(boundingBoxes: THREE.Box3[]): Promise<void> {
        const geometryD: THREE.BoxGeometry = new THREE.BoxGeometry(this.SCENE_DEPTH_WIDTH_G, this.SCENE_HEIGHT_G, this.WALL_DEPTH);
        const geometryW: THREE.BoxGeometry = new THREE.BoxGeometry(this.WALL_DEPTH, this.SCENE_HEIGHT_G, this.SCENE_DEPTH_WIDTH_G);
        const geometryH: THREE.BoxGeometry = new THREE.BoxGeometry(this.SCENE_DEPTH_WIDTH_G, this.WALL_DEPTH, this.SCENE_DEPTH_WIDTH_G);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });

        this.addWall(geometryD, material, boundingBoxes, 0, 0, -this.WALL_POS_XZ_G);
        this.addWall(geometryD, material, boundingBoxes, 0, 0, this.WALL_POS_XZ_G);
        this.addWall(geometryW, material, boundingBoxes, this.WALL_POS_XZ_G, 0, 0);
        this.addWall(geometryW, material, boundingBoxes, -this.WALL_POS_XZ_G, 0, 0);
        this.addWall(geometryH, material, boundingBoxes, 0, this.WALL_POS_Y_G, 0);
        this.addWall(geometryH, material, boundingBoxes, 0, -this.WALL_POS_Y_G, 0);
    }

    private static addWall(geometry: THREE.BoxGeometry, material: THREE.MeshBasicMaterial,
                           boundingBoxes: THREE.Box3[], posX: number,
                           posY: number, posZ: number): void {
        const wall: THREE.Mesh = new THREE.Mesh(geometry, material);
        wall.position.set(posX, posY, posZ);

        // TODO: remove
        // Test pour voir les murs
        // const color: THREE.Color = new THREE.Color(0x00FF00);
        // const helper: THREE.BoxHelper = new THREE.BoxHelper(wall, color);
        // scene.add(helper);

        const box3dside1: THREE.Box3 = new THREE.Box3();
        box3dside1.setFromObject(wall);
        boundingBoxes.push(box3dside1);
    }
}
