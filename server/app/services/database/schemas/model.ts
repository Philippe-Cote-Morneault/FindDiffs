import { model, Document, Model, Schema } from "mongoose";
import { IGameCardModel } from "./gameCardSchema";

export interface IGameCard extends Document {
    title: string;
    author: number;
}

export const gameCardSchema: Schema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
});

export const GameCard = model("GameCard", gameCardSchema);

export const gameCard: Model<IGameCard> = model<IGameCard>("GameCardIGa", gameCardSchema);
