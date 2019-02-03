import {model, Document, Model, Schema} from "mongoose";
import { POVType } from "../../../../common/model/gameCard";

export interface IGameCard extends Document {
    pov: POVType;
    title: string;
    imagePairId: string;
    best_time_solo: number[];
    best_time_online: number[];
    creation_date: Date;
}

export const gameCardSchema: Schema = new Schema({
    pov: {type: String, required: true},
    title: {type: String, required: true},
    imagePairId: {type: String, required: true, select: false},
    best_time_solo: {type: [Number], required: true},
    best_time_online: {type: [Number], required: true},
    creation_date: {type: Date, required: true},
});

gameCardSchema.plugin(require("@meanie/mongoose-to-json"));

// tslint:disable-next-line:variable-name
export const GameCard: Model<IGameCard> = model<IGameCard>("GameCard", gameCardSchema);
