import mongoose, { Document, Schema } from "mongoose";

export type PaymentType = "MemberShip" | "Event" | undefined;

export interface IPayment extends Document {
  _id: mongoose.Types.ObjectId;
  type: PaymentType;
  amount: number;
  userid: mongoose.Types.ObjectId;
  membershipidOrEventId: mongoose.Types.ObjectId;
}

const paymentSchema = new Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  userid: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  membershipid: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;
