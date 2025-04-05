import { PaymentType } from "../../model/Payment";
import { ABONEMENT_TARIF_REDUIT, ABONNEMENT_TARIF_NORMAL } from "../../utils/constantes";
import { abonementRepository } from "../repositories/AbonnementRepository";
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
    const abonement = await abonementRepository.getAbonementBySlug(eventData.formSlug);
    if (!event && !abonement) {
      throw new Error("Event ou Abo not found");
    }


    if(eventData.formSlug === ABONEMENT_TARIF_REDUIT || eventData.formSlug === ABONNEMENT_TARIF_NORMAL) {
      await abonementRepository.addUserToAbonement(eventData.formSlug, String(newUser._id));
      eventData.amount.forEach(async (amount) => {
        await paymentRepository.create({
          type: eventData.formSlug as PaymentType,
          amount: amount,
          userid: newUser._id,
          membershipidOrEventId: event ? event._id : abonement ? abonement._id : null,
        });
      });
    } else {
      await eventRepository.addUserToEvent(eventData.formSlug, newUser._id);
      eventData.amount.forEach(async (amount) => {
        await paymentRepository.create({
          type: eventData.formType,
          amount: amount,
          userid: newUser._id,
          membershipidOrEventId: event ? event._id : abonement ? abonement._id : null,
        });
      });
    }
  } else {
    const event = await eventRepository.getEventBySlug(eventData.formSlug);
    const abonement = await abonementRepository.getAbonementBySlug(eventData.formSlug);
    if (!event && !abonement) {
      throw new Error("Event ou Abo not found");
    }
    if(eventData.formSlug === ABONEMENT_TARIF_REDUIT || eventData.formSlug === ABONNEMENT_TARIF_NORMAL) {
      await abonementRepository.addUserToAbonement(eventData.formSlug, String(userId));
      
      eventData.amount.forEach(async (amount) => {
        await paymentRepository.create({
          type: eventData.formSlug as PaymentType,
          amount: amount,
          userid: userId,
          membershipidOrEventId: event ? event._id : abonement ? abonement._id : null,
        });
      });
    } else {
      await eventRepository.addUserToEvent(eventData.formSlug, userId);
      
      eventData.amount.forEach(async (amount) => {
        await paymentRepository.create({
          type: eventData.formType,
          amount: amount,
          userid: userId,
          membershipidOrEventId: event ? event._id : abonement ? abonement._id : null,
        });
      });
    }

  }
}
