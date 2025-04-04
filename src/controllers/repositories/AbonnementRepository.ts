import mongoose from "mongoose";
import Abonement, {IAbonement} from "../../model/Abonement";

export interface CreateAbonementData {
    nom: string;
    url: string;
    slug: string;
}

export class AbonementRepository {
    create = async (abonementData: CreateAbonementData): Promise<IAbonement> => {
        const newAbonement = new Abonement({
            nom: abonementData.nom,
            url: abonementData.url,
            slug: abonementData.slug
        });
        try {
            return await newAbonement.save();
        } catch (error) {
            throw new Error("Error while saving abonement" + error);
        }
    };
    getAbonementBySlug = async (slug: string): Promise<IAbonement | null> => {
        return await Abonement.findOne({ slug });
    };
    addUserToAbonement = async (slug: string, userId: string): Promise<void> => {
        const abonement = await this.getAbonementBySlug(slug);
        if (!abonement) {
            throw new Error("Abonement not found");
        }
        abonement.participants.push(userId);
        await abonement.save();
    }
    getAllAbonementsMembers = async (): Promise<IAbonement[]> => {
        try {
            const abonements = await Abonement.find().populate("participants");
            return abonements;
        } catch (error) {
            throw new Error("Error while fetching abonements" + error);
        }
    }
}

export const abonementRepository = new AbonementRepository();