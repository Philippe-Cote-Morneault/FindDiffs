import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { SceneTransformation } from "../../../../../../common/model/scene/modifications/sceneTransformation";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { Grid } from "../../grid/grid";
import { GeometricObjectGenerator } from "../../shapeCreation/geometricObjectGenerator";

/**
 * In charge of adding a random object to a scene
 */
export class SceneObjectAdder implements SceneTransformation {
    private grid: Grid;

    public constructor(grid: Grid) {
        this.grid = grid;
    }

    public applyTransformation(objectsToTransform: ICommonSceneObject[],
                               modifications: ICommonSceneModifications,
                               type: ObjectType): void {
            const position: ICommon3DPosition = this.grid.getNextPosition();

            modifications.addedObjects.push(
                GeometricObjectGenerator.getInstance().createObject(position),
            );
    }
}
