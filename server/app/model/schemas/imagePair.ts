import {model, Document, Model, Schema} from "mongoose";
import { CommonImagePair } from "../../../../common/model/imagePair";
import Config from "../../config";

export interface IImagePair extends CommonImagePair, Document {}

export const imagePairSchema: Schema = new Schema({
    file_difference_id: {type: String, required: true, select: false},
    file_original_id: {type: String, required: true, select: false},
    file_modified_id: {type: String, required: true, select: false},
    name: {type: String, required: true},
    creation_date: {type: Date, required: true},
    differences_count: {type: Number, required: true},
});

imagePairSchema.plugin(require("@meanie/mongoose-to-json"));
imagePairSchema.set("toJSON", { virtuals: true });

imagePairSchema.virtual("url_difference").get(function(this: Document): string {
    return `http://${Config.hostname}:${Config.port}/image-pair/${this.id}/difference`;
});
imagePairSchema.virtual("url_modified").get(function(this: Document): string {
    return `http://${Config.hostname}:${Config.port}/image-pair/${this.id}/modified`;
});
imagePairSchema.virtual("url_original").get(function(this: Document): string {
    return `http://${Config.hostname}:${Config.port}/image-pair/${this.id}/original`;
});

// tslint:disable-next-line:variable-name
export const ImagePair: Model<IImagePair> = model<IImagePair>("ImagePair", imagePairSchema);
