import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: mongoose.Types.ObjectId;
    slug: string;
    nom: string;
    url: string;
    nbrMax: number | null;
    date: string;
    participants: mongoose.Types.ObjectId[];
}

const eventSchema = new Schema({
    slug: { type: String, required: true },
    nom: { type: String, required: true },
    url: { type: String, required: true },
    nbrMax: { type: Number, default: null },
    date: { type: String, required: true },
    participants: [{ type: [Schema.Types.ObjectId], default: [], ref: "User" }],
});

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event