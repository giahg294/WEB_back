import mongoose from "mongoose";
import Event, { IEvent } from "../../model/Event";

export interface CreateEventData {
    nom: string;
    url: string;
}

export class EventRepository {
    create = async (eventData: CreateEventData): Promise<IEvent> => {
        const newEvent = new Event({
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
    getEventByName = async (nom: string): Promise<IEvent | null> => {
        return await Event.findOne({ nom });
    };
    addUserToEvent = async (
        eventName: string,
        userId: mongoose.Types.ObjectId
    ): Promise<void> => {
        const event = await this.getEventByName(eventName);
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