import * as THREE from "three";

export class WallLoader {
    private static readonly SCENE_DEPTH_THEMATIC: number = 140;
    private static readonly SCENE_HEIGHT_THEMATIC: number = 30;
    private static readonly SCENE_WIDTH_THEMATIC: number = 100;
    private static readonly SCENE_DEPTH_WIDTH_GEOMETRIC: number = 250;
    private static readonly SCENE_HEIGHT_GEOMETRIC: number = 125;

    private static readonly WALL_POS_X_THEMATIC: number = 48;
    private static readonly WALL_POS_Y_THEMATIC: number = 15;
    private static readonly WALL_TOP_POS_Y_THEMATIC: number = 30;
    private static readonly WALL_POS_Z_THEMATIC: number = 68;
    private static readonly WALL_POS_Y_GEOMETRIC: number = 63;
    private static readonly WALL_POS_XZ_GEOMETRIC: number = 125;

    private static readonly WALL_DEPTH: number = 1;

    public static async loadThematic(scene: THREE.Scene, objects: THREE.Object3D[]): Promise<void> {
        const geometryD: THREE.BoxGeometry = new THREE.BoxGeometry(this.SCENE_WIDTH_THEMATIC, this.SCENE_HEIGHT_THEMATIC, this.WALL_DEPTH);
        const geometryW: THREE.BoxGeometry = new THREE.BoxGeometry(this.WALL_DEPTH, this.SCENE_HEIGHT_THEMATIC, this.SCENE_DEPTH_THEMATIC);
        const geometryH: THREE.BoxGeometry = new THREE.BoxGeometry(this.SCENE_WIDTH_THEMATIC, this.WALL_DEPTH, this.SCENE_DEPTH_THEMATIC);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0});

        this.addWall(geometryD, material, scene, objects, 0, this.WALL_POS_Y_THEMATIC, -this.WALL_POS_Z_THEMATIC);
        this.addWall(geometryD, material, scene, objects, 0, this.WALL_POS_Y_THEMATIC, this.WALL_POS_Z_THEMATIC);
        this.addWall(geometryW, material, scene, objects, this.WALL_POS_X_THEMATIC, this.WALL_POS_Y_THEMATIC, 0);
        this.addWall(geometryW, material, scene, objects, -this.WALL_POS_X_THEMATIC, this.WALL_POS_Y_THEMATIC, 0);
        this.addWall(geometryH, material, scene, objects, 0, this.WALL_TOP_POS_Y_THEMATIC, 0);
        this.addWall(geometryH, material, scene, objects, 0, 0, 0);
    }

    public static async loadGeometric(scene: THREE.Scene, objects: THREE.Object3D[]): Promise<void> {
        const geometryD: THREE.BoxGeometry = new THREE.BoxGeometry(this.SCENE_DEPTH_WIDTH_GEOMETRIC,
                                                                   this.SCENE_HEIGHT_GEOMETRIC, this.WALL_DEPTH);
        const geometryW: THREE.BoxGeometry = new THREE.BoxGeometry(this.WALL_DEPTH, this.SCENE_HEIGHT_GEOMETRIC,
                                                                   this.SCENE_DEPTH_WIDTH_GEOMETRIC);
        const geometryH: THREE.BoxGeometry = new THREE.BoxGeometry(this.SCENE_DEPTH_WIDTH_GEOMETRIC, this.WALL_DEPTH,
                                                                   this.SCENE_DEPTH_WIDTH_GEOMETRIC);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0});

        this.addWall(geometryD, material, scene, objects, 0, 0, -this.WALL_POS_XZ_GEOMETRIC);
        this.addWall(geometryD, material, scene, objects, 0, 0, this.WALL_POS_XZ_GEOMETRIC);
        this.addWall(geometryW, material, scene, objects, this.WALL_POS_XZ_GEOMETRIC, 0, 0);
        this.addWall(geometryW, material, scene, objects, -this.WALL_POS_XZ_GEOMETRIC, 0, 0);
        this.addWall(geometryH, material, scene, objects, 0, this.WALL_POS_Y_GEOMETRIC, 0);
        this.addWall(geometryH, material, scene, objects, 0, -this.WALL_POS_Y_GEOMETRIC, 0);
    }

    private static addWall(geometry: THREE.BoxGeometry, material: THREE.MeshBasicMaterial,
                           scene: THREE.Scene, objects: THREE.Object3D[], posX: number,
                           posY: number, posZ: number): void {
        const wall: THREE.Mesh = new THREE.Mesh(geometry, material);
        wall.position.set(posX, posY, posZ);
        objects.push(wall);
        scene.add(wall);
    }
}
