import mongoose, { Document, Schema } from "mongoose";
import { IAdhesion } from "./Adhesion";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    nom: string;
    prenom: string;
    email: string;
    adhesion: mongoose.Types.ObjectId[];
}

const userSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    adhesion: [{ type: [Schema.Types.ObjectId], default: [], ref: "Adhesion" }],
});

const User = mongoose.model<IUser>("User", userSchema);