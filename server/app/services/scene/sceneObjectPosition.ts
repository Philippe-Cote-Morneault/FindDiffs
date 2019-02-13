import { ICommonPositionObjects } from "../../../../common/model/scene/sceneObject";

export class SceneObjectPosition {
    public readonly sizeScene: number = 1000;
    private readonly SQUARE: number = 2;
    private readonly CUBE: number = 3;

    public modelPosition(): ICommonPositionObjects {
        const TEN: number = 10;
        const POWER_HUNDRED: number = 3;
        const POWER_THOUSANDS: number = 6;
        const position: number = Math.round(Math.random() * Math.pow(this.sizeScene, this.CUBE));

        let z: number = position % this.sizeScene;
        const y: number = ((position % Math.pow(this.sizeScene, this.SQUARE)) - position % this.sizeScene) / Math.pow(TEN, POWER_HUNDRED);
        const x: number = ((position) - (position % Math.pow(this.sizeScene, this.SQUARE))) / Math.pow(TEN, POWER_THOUSANDS);

        if (position > this.sizeScene) {
            z -= 1;
        }

        const modelPosition: ICommonPositionObjects = {x: 0, y: 0, z: 0};
        modelPosition.x = x;
        modelPosition.y = y;
        modelPosition.z = z;

        return modelPosition;
    }
}
