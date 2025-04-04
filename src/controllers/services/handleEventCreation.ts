import { ABONEMENT_TARIF_REDUIT, ABONNEMENT_TARIF_NORMAL } from "../../utils/constantes";
import { abonementRepository } from "../repositories/AbonnementRepository";
import { CreateEventData, EventRepository } from "../repositories/EventRepositorie";

const eventRepository = new EventRepository();

export async function handleEventCreation(eventData: CreateEventData) {
    try {
        const isExistingEvent = await eventRepository.getEventBySlug(eventData.slug);
        if (!isExistingEvent) {
            if (eventData.slug !== ABONEMENT_TARIF_REDUIT && eventData.slug !== ABONNEMENT_TARIF_NORMAL) {
                await eventRepository.create(eventData);
            }
            else {
                await abonementRepository.create({
                    nom: eventData.nom,
                    url: eventData.url,
                    slug: eventData.slug
                })
            }
        }
        else console.log("Event already exists");
    } catch {
        throw new Error("Error while saving event");
    }
}