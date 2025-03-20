import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: mongoose.Types.ObjectId;
    nom: string;
    url: string;
    participants: mongoose.Types.ObjectId[];
}

const eventSchema = new Schema({
    nom: { type: String, required: true },
    url: { type: String, required: true },
    participants: [{ type: [Schema.Types.ObjectId], default: [], ref: "User" }],
});

const Event = mongoose.model<IEvent>("Event", eventSchema);