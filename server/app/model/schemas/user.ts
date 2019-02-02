import {model, Document, Model, Schema} from "mongoose";
import { CommonUser } from "../../../../common/model/user";

export interface IUser extends CommonUser, Document {}

export const userSchema: Schema = new Schema({
    username: {type: String, required: true},
    creation_date: {type: Date, required: true},
});

userSchema.plugin(require("@meanie/mongoose-to-json"));

// tslint:disable-next-line:variable-name
export const User: Model<IUser> = model<IUser>("User", userSchema);
