import mongoose from "mongoose";
import Adhesion, { IAdhesion } from "../../model/Adhesion";

export interface CreateAdhesionData {
  nom: string;
  url: string;
}

export class AdhesionRepository {
  create = async (adhesionData: CreateAdhesionData): Promise<IAdhesion> => {
    const newAdhesion = new Adhesion({
      nom: adhesionData.nom,
      url: adhesionData.url,
      participants: [],
    });
    try {
      return await newAdhesion.save();
    } catch (error) {
      throw new Error("Error while saving adhesion" + error);
    }
  };
  getAdhesionByName = async (nom: string): Promise<IAdhesion | null> => {
    return await Adhesion.findOne({ nom });
  };
  addUserToAdhesion = async (
    adhesionName: string,
    userId: mongoose.Types.ObjectId
  ): Promise<void> => {
    const adhesion = await this.getAdhesionByName(adhesionName);
    if (!adhesion) {
      throw new Error("Adhesion not found");
    }
    adhesion.participants.push(userId);
    await adhesion.save();
  };
  isUserInAdhesion = async (
    userId: mongoose.Types.ObjectId
  ): Promise<mongoose.Types.ObjectId | undefined> => {
    const adhesion = await Adhesion.findOne({ participants: userId });
    return adhesion?._id;
  };
  getAllAdhesions = async (): Promise<IAdhesion[]> => {
    return await Adhesion.find();
  }
}

export const adhesionRepository = new AdhesionRepository();
