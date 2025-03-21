import { AdhesionRepository,CreateAdhesionData } from "../repositories/AdhesionRepository";
const adhesionRepository = new AdhesionRepository();



export async function handleAdhesionCreation(adhesionData: CreateAdhesionData) {
  try {
    const isExistingAdhesion = await adhesionRepository.getAdhesionByName(adhesionData.nom);
    if (!isExistingAdhesion) adhesionRepository.create(adhesionData);
    else console.log("Adhesion already exists");
  } catch {
    throw new Error("Error while saving adhesion");
  }
}
