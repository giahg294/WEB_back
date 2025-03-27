import mongoose from "mongoose";
import Event, { IEvent } from "../../model/Event";

export interface CreateEventData {
    slug:string;
    nom: string;
    url: string;
}

export class EventRepository {
    create = async (eventData: CreateEventData): Promise<IEvent> => {
        const newEvent = new Event({
            slug: eventData.slug,
            nom: eventData.nom,
            url: eventData.url,
            participants: [],
        });
        try {
            return await newEvent.save();
        } catch (error) {
            throw new Error("Error while saving event" + error);
        }
    };
    getEventBySlug = async (slug: string): Promise<IEvent | null> => {
        return await Event.findOne({ slug });
    };
    addUserToEvent = async (
        eventName: string,
        userId: mongoose.Types.ObjectId
    ): Promise<void> => {
        const event = await this.getEventBySlug(eventName);
        if (!event) {
            throw new Error("Event not found");
        }
        event.participants.push(userId);
        await event.save();
    }
    getAllEvents = async (): Promise<IEvent[]> => {
        return await Event.find();
    }
}

export const eventRepository = new EventRepository();