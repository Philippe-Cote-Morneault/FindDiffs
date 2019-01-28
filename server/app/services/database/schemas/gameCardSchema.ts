import { Document, Model, Schema, HookNextFunction } from "mongoose";

const mongoose = require('mongoose');

export interface IGameCardModel extends Document {
}

export const GameCardSchema = new Schema ({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
      age: Number,
      website: String
    },
    created_at: Date,
    updated_at: Date
  });

  const User = mongoose.model<IUser>('User', UserSchema);
