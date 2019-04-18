import * as THREE from "three";
import { ICommonSceneDimensions } from "../../../../../../common/model/scene/scene";

export class LightGenerator {
    private static readonly WHITE_LIGHT_COLOR: number = 0xFFFFFF;
    private static readonly SOFT_WHITE_LIGHT_COLOR: number = 0x303030;
    private static readonly LIGHT_INTENSITY: number = 2;
    private static readonly LIGHT_DISTANCE: number = 400;
    private static readonly DISTANCE_RATIO: number = 1.5;

    public static generateLighting(scene: THREE.Scene, sceneDimensions: ICommonSceneDimensions): void {
        scene.add(LightGenerator.generateBottomSouthEastLight(sceneDimensions));
        scene.add(LightGenerator.generateTopNorthEastLight(sceneDimensions));
        scene.add(LightGenerator.generateTopSouthWestLight(sceneDimensions));
        scene.add(LightGenerator.generateBottomNorthWestLight(sceneDimensions));

        scene.add(new THREE.AmbientLight(LightGenerator.SOFT_WHITE_LIGHT_COLOR));
    }

    private static generateTopNorthEastLight(dimensions: ICommonSceneDimensions): THREE.PointLight {
        const light: THREE.PointLight = this.createLight();

        light.position.set(
            dimensions.x / LightGenerator.DISTANCE_RATIO,
            dimensions.y,
            dimensions.z / LightGenerator.DISTANCE_RATIO,
        );

        return light;
    }

    private static generateBottomNorthWestLight(dimensions: ICommonSceneDimensions): THREE.PointLight {
        const light: THREE.PointLight = this.createLight();

        this.setLightPosition(light, -dimensions.x, -dimensions.y, dimensions.z);

        return light;
    }

    private static generateBottomSouthEastLight(dimensions: ICommonSceneDimensions): THREE.PointLight {
        const light: THREE.PointLight = this.createLight();

        this.setLightPosition(light, dimensions.x, -dimensions.y, -dimensions.z);

        return light;
    }

    private static generateTopSouthWestLight(dimensions: ICommonSceneDimensions): THREE.PointLight {
        const light: THREE.PointLight = this.createLight();

        this.setLightPosition(light, -dimensions.x, dimensions.y, -dimensions.z);

        return light;
    }

    private static createLight(): THREE.PointLight {
        return new THREE.PointLight(
            LightGenerator.WHITE_LIGHT_COLOR,
            LightGenerator.LIGHT_INTENSITY,
            LightGenerator.LIGHT_DISTANCE,
        );
    }

    private static setLightPosition(light:THREE.PointLight, xDimension: number, yDimension: number, zDimension: number): void {
        light.position.set(
            xDimension / LightGenerator.DISTANCE_RATIO,
            yDimension,
            zDimension / LightGenerator.DISTANCE_RATIO,
        );
    }
     
}
