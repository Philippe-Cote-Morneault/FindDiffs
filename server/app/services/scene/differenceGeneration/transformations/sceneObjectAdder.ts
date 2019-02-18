import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { Grid } from "../../grid";
import { GeometricObjectGenerator } from "../../shapeCreation/geometricObjectGenerator";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of adding a random object to a scene
 */
export class SceneObjectAdder implements SceneTransformation {
    private grid: Grid;

    public constructor(grid: Grid) {
        this.grid = grid;
    }

    public applyTransformation(objectsToTransform: ICommonSceneObject[],
                               modifications: ICommonSceneModifications): void {
            const position: ICommon3DPosition = this.grid.getNextPosition();

            modifications.addedObjects.push(
                GeometricObjectGenerator.getInstance().createObject(position),
            );
    }
}
