import mongoose from "mongoose";
import Payment, { IPayment, PaymentType } from "../../model/Payment";
import { IUser } from "../../model/User";

export interface CreatePaymentData {
  type: PaymentType;
  amount: number;
  userid: mongoose.Types.ObjectId;
  membershipidOrEventId: mongoose.Types.ObjectId | null;
}

export class PaymentRepository {
  getAllPayments = async (): Promise<IPayment[]> => {
    try {
      const payments = await Payment.find().populate("userid");
      return payments;
    } catch {
      throw new Error("Error while fetching payments");
    }
  };
  create = async (paymentData: CreatePaymentData): Promise<IPayment> => {
    const newPayment = new Payment({
      type: paymentData.type,
      amount: paymentData.amount,
      userid: paymentData.userid,
      membershipidOrEventId: paymentData.membershipidOrEventId,
    });
    try {
      return await newPayment.save();
    } catch (error) {
      throw new Error("Error while saving payment" + error);
    }
  };
}

export const paymentRepository = new PaymentRepository();
