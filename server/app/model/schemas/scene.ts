import {model, Document, Model, Schema} from "mongoose";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { Grid } from "../../services/scene/grid";

export interface IScene extends Document {
    scene: ICommonScene;
    grid: Grid;
    creation_date: Date;
}

export const sceneSchema: Schema = new Schema({
    scene: {type: Object, required: true},
    grid: {type: Object, required: true},
    creation_date: {type: Date, required: true},
});

sceneSchema.plugin(require("@meanie/mongoose-to-json"));

// tslint:disable-next-line:variable-name
export const Scene: Model<IScene> = model<IScene>("Scene", sceneSchema);
