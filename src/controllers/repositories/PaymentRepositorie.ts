import mongoose from "mongoose";
import Payment, { IPayment, PaymentType } from "../../model/Payment";

export interface CreatePaymentData {
  type: PaymentType;
  amount: number;
  userid: mongoose.Types.ObjectId;
  membershipidOrEventId: mongoose.Types.ObjectId;

}

export class PaymentRepository {
  create = async (paymentData: CreatePaymentData): Promise<IPayment> => {
    const newPayment = new Payment({
        type: paymentData.type,
        amount: paymentData.amount,
        userid: paymentData.userid,
        membershipidOrEventId: paymentData.membershipidOrEventId
    });
    try {
      return await newPayment.save();
    } catch (error) {
      throw new Error("Error while saving payment" + error);
    }
  };
}

export const paymentRepository = new PaymentRepository();