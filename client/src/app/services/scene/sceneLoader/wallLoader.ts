import * as THREE from "three";
import { ICommonWallSettings } from "../../../../../../common/model/scene/objects/wallSettings";

export class WallLoader {
    private static readonly WALL_TOP_POS_Y_THEMATIC: number = 30;
    private static readonly WALL_DEPTH: number = 1;

    public static async loadThematic(scene: THREE.Scene, objects: THREE.Object3D[]): Promise<void> {

        const thematicWallSettings: ICommonWallSettings = {
            depth: 140,
            height: 30,
            width: 100,
            position: {
                x: 48,
                y: 15,
                z: 68,
            },
        };

        const geometryD: THREE.BoxGeometry =
            new THREE.BoxGeometry(thematicWallSettings.width, thematicWallSettings.height, this.WALL_DEPTH);
        const geometryW: THREE.BoxGeometry =
            new THREE.BoxGeometry(this.WALL_DEPTH, thematicWallSettings.height, thematicWallSettings.depth);
        const geometryH: THREE.BoxGeometry =
            new THREE.BoxGeometry(thematicWallSettings.width, this.WALL_DEPTH, thematicWallSettings.depth);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });

        this.addWall(geometryD, material, scene, objects, 0, thematicWallSettings.position.y, -thematicWallSettings.position.z);
        this.addWall(geometryD, material, scene, objects, 0, thematicWallSettings.position.y, thematicWallSettings.position.z);
        this.addWall(geometryW, material, scene, objects, thematicWallSettings.position.x, thematicWallSettings.position.y, 0);
        this.addWall(geometryW, material, scene, objects, -thematicWallSettings.position.x, thematicWallSettings.position.y, 0);
        this.addWall(geometryH, material, scene, objects, 0, this.WALL_TOP_POS_Y_THEMATIC, 0);
        this.addWall(geometryH, material, scene, objects, 0, 0, 0);
    }

    public static async loadGeometric(scene: THREE.Scene, objects: THREE.Object3D[]): Promise<void> {

        const geometricWallSettings: ICommonWallSettings = {
            depth: 250,
            height: 125,
            width: 250,
            position: {
                x: 125,
                y: 63,
                z: 125,
            },
        };

        const geometryD: THREE.BoxGeometry =
            new THREE.BoxGeometry(geometricWallSettings.depth, geometricWallSettings.height, this.WALL_DEPTH);
        const geometryW: THREE.BoxGeometry =
            new THREE.BoxGeometry(this.WALL_DEPTH, geometricWallSettings.height, geometricWallSettings.width);
        const geometryH: THREE.BoxGeometry =
            new THREE.BoxGeometry(geometricWallSettings.depth, this.WALL_DEPTH, geometricWallSettings.width);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });

        this.addWall(geometryD, material, scene, objects, 0, 0, -geometricWallSettings.position.x);
        this.addWall(geometryD, material, scene, objects, 0, 0, geometricWallSettings.position.z);
        this.addWall(geometryW, material, scene, objects, geometricWallSettings.position.x, 0, 0);
        this.addWall(geometryW, material, scene, objects, -geometricWallSettings.position.z, 0, 0);
        this.addWall(geometryH, material, scene, objects, 0, geometricWallSettings.position.y, 0);
        this.addWall(geometryH, material, scene, objects, 0, -geometricWallSettings.position.y, 0);
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
