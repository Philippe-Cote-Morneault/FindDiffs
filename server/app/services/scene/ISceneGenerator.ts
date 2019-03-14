import { ICommonGeometricScene } from "../../../../common/model/scene/scene";
import { Grid } from "./grid/grid";

export interface ISceneGenerator {
    getGrid(): Grid | undefined;
    generateScene(): ICommonGeometricScene;
}
