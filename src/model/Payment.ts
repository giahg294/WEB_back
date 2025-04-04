import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { ABONEMENT_TARIF_REDUIT, ABONNEMENT_TARIF_NORMAL } from "../utils/constantes";

export type PaymentType = "Membership" | "Event" | typeof ABONEMENT_TARIF_REDUIT | typeof ABONNEMENT_TARIF_NORMAL | undefined;

export interface IPayment extends Document {
  _id: mongoose.Types.ObjectId;
  type: PaymentType;
  amount: number;
  userid: mongoose.Types.ObjectId | IUser;
  membershipidOrEventId: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  userid: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  membershipid: {
    type: Schema.Types.ObjectId,
    required: false,
    default: null,
  },
}, {
  timestamps: true,
});

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;
