import { Document, model, Model, Schema } from "mongoose";
import {  GameCard } from "../../../../../common/model/gameCard/gameCard";

export const gameCardSchema: Schema = new Schema ({
    guid: String,
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

export interface GameCardDocument extends GameCard, Document {}

export const gameCard: Model<GameCardDocument> = model<GameCardDocument>("GameCard", gameCardSchema);
