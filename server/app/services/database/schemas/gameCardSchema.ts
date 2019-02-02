import { model, Document, Model, Schema,  } from "mongoose";
import {  CommonGameCard } from "../../../../../common/model/gameCard";

export const gameCardSchema: Schema = new Schema ({
    id: String,
    pov: String,
    title: String,
    images: {
        id: String,
        url_difference: String,
        url_modified: String,
        url_original: String,
        name: String,
        creation_date: Date,
        differences_count: Number,
    },
    bestTimesSolo: [Number],
    bestTimesOnline: [Number],
  });

export interface GameCardDocument extends CommonGameCard, Document {}

export const gameCard: Model<GameCardDocument> = model<GameCardDocument>("GameCard", gameCardSchema);
