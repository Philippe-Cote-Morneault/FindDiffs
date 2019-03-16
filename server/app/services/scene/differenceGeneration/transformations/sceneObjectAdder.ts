import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { SceneTransformation } from "../../../../../../common/model/scene/modifications/sceneTransformation";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { Grid } from "../../grid/grid";
import { IPostionGridTheme } from "../../grid/theme/themeGrid";
import { GeometricObjectGenerator } from "../../objectGeneration/shapeCreation/geometricObjectGenerator";
import { ThemeObjectGenerator } from "../../objectGeneration/themeCreation/themeObjectGenerator";

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

            if (type === ObjectType.Geometric) {
                modifications.addedObjects.push(
                    GeometricObjectGenerator.getInstance().createObject(position),
                );
            } else {
                modifications.addedObjects.push(
                    ThemeObjectGenerator.getInstance().createObject(position as IPostionGridTheme),
                );
            }
    }
}
