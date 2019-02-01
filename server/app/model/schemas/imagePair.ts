import {model, Document, Model, Schema} from "mongoose";
import { CommonImagePair } from "../../../../common/model/imagePair";

export interface IImagePair extends CommonImagePair, Document {}

export const imagePairSchema: Schema = new Schema({
    file_id: {type: String, required: true},
    name: {type: String, required: true},
    creation_date: {type: Date, required: true},
    differences_count: {type: Number, required: true},
});

imagePairSchema.plugin(require("meanie-mongoose-to-json"));

// tslint:disable-next-line:variable-name
export const ImagePair: Model<IImagePair> = model<IImagePair>("ImagePair", imagePairSchema);
