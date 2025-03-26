import { CreateEventData, EventRepository } from "../repositories/EventRepositorie";

const eventRepository = new EventRepository();

export async function handleEventCreation(eventData: CreateEventData) {
    try {
        const isExistingEvent = await eventRepository.getEventBySlug(eventData.slug);
        if (!isExistingEvent) eventRepository.create(eventData);
        else console.log("Event already exists");
    } catch {
        throw new Error("Error while saving event");
    }
}