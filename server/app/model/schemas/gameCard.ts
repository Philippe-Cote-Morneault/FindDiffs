import {model, Document, Model, Schema} from "mongoose";
import { ICommonScoreEntry, POVType } from "../../../../common/model/gameCard";

export interface IGameCard extends Document {
    pov: POVType;
    title: string;
    resource_id: string;
    best_time_solo: ICommonScoreEntry[];
    best_time_online: ICommonScoreEntry[];
    creation_date: Date;
}

export const gameCardSchema: Schema = new Schema({
    pov: {type: String, required: true},
    title: {type: String, required: true},
    resource_id: {type: String, required: true},
    best_time_solo: {type: [Object], required: true},
    best_time_online: {type: [Object], required: true},
    creation_date: {type: Date, required: true},
});

gameCardSchema.plugin(require("@meanie/mongoose-to-json"));

// tslint:disable-next-line:variable-name
export const GameCard: Model<IGameCard> = model<IGameCard>("GameCard", gameCardSchema);
