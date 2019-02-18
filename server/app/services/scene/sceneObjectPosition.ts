import { ICommon3DPosition } from "../../../../common/model/positions";

export class SceneObjectPosition {
    public readonly sizeScene: number = 200;

    public modelPosition(): ICommon3DPosition {
        const modelPosition: ICommon3DPosition = {x: 0, y: 0, z: 0};
        modelPosition.x = Math.round(Math.random() * this.sizeScene);
        modelPosition.y = Math.round(Math.random() * this.sizeScene);
        modelPosition.z = Math.round(Math.random() * this.sizeScene);

        return modelPosition;
    }
}
