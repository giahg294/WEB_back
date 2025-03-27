import { PaymentType } from "../../model/Payment";
import { AdhesionRepository } from "../repositories/AdhesionRepository";
import { EventRepository } from "../repositories/EventRepositorie";
import { PaymentRepository } from "../repositories/PaymentRepositorie";
import { UserRepository } from "../repositories/UserRepositorie";

const userRepository = new UserRepository();
const adhesionRepository = new AdhesionRepository();
const paymentRepository = new PaymentRepository();
const eventRepository = new EventRepository();

export interface PaymentEventData {
  formType: PaymentType;
  nom: string;
  prenom: string;
  email: string;
  formSlug: string;
  amount: number[];
}

export async function handleEventPayment(eventData: PaymentEventData) {
  const userId = await userRepository.getUserIdByEmail(eventData.email);
  if (!userId) {
    const newUser = await userRepository.create({
      nom: eventData.nom,
      prenom: eventData.prenom,
      email: eventData.email,
    });

    const event = await eventRepository.getEventBySlug(eventData.formSlug);
    if (!event) {
      throw new Error("Event not found");
    }
    eventData.amount.forEach(async (amount) => {
      await paymentRepository.create({
        type: eventData.formType,
        amount: amount,
        userid: newUser._id,
        membershipidOrEventId: event._id,
      });
    });

    await eventRepository.addUserToEvent(eventData.formSlug, newUser._id);
  } else {
    const event = await eventRepository.getEventBySlug(eventData.formSlug);
    if (!event) {
      throw new Error("Event not found");
    }
    await eventRepository.addUserToEvent(eventData.formSlug, userId);

    eventData.amount.forEach(async (amount) => {
      await paymentRepository.create({
        type: eventData.formType,
        amount: amount,
        userid: userId,
        membershipidOrEventId: event._id,
      });
    });
  }
}
