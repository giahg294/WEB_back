import mongoose from "mongoose";
import Event, { IEvent } from "../../model/Event";

export interface CreateEventData {
    slug:string;
    nom: string;
    url: string;
    date: string;
}

export class EventRepository {
    create = async (eventData: CreateEventData): Promise<IEvent> => {
        const newEvent = new Event({
            slug: eventData.slug,
            nom: eventData.nom,
            url: eventData.url,
            date: eventData.date,
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
    getEventsGroupedByDate = async () => {
        try {
          const participantsBySessions = await Event.aggregate([
            {
              $addFields: {
                convertedDate: { $toDate: "$date" }
              }
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$convertedDate"
                  }
                },
                events: {
                  $push: {
                    slug: "$slug",
                    nom: "$nom",
                    nbrParticipants: { $size: "$participants" },
                    participants: "$participants"
                  }
                }
              }
            },
            {
              $project: {
                date: "$_id",
                totalParticipants: {
                  $reduce: {
                    input: "$events",
                    initialValue: 0,
                    in: { 
                      $add: [
                        "$$value", 
                        { $size: "$$this.participants" }
                      ]
                    }
                  }
                },
                eventDetails: "$events"
              }
            },
            {
              $sort: { date: 1 }
            }
          ]);
        
          return participantsBySessions;
        } catch (error) {
          console.error("Erreur lors de la récupération des participants :", error);
          throw error;
        }
      };
}

export const eventRepository = new EventRepository();