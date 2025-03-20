import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface IAdhesion extends Document {
  _id: mongoose.Types.ObjectId;
  nom: string;
  url: string;
  participants: mongoose.Types.ObjectId[];
}

const adhesionSchema = new Schema({
  nom: { type: String, required: true },
  url: { type: String, required: true },
  participants: [{ type: [Schema.Types.ObjectId], default: [], ref: "User" }],
});

const Adhesion = mongoose.model<IAdhesion>("Adhesion", adhesionSchema);