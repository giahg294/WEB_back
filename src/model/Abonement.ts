import mongoose, {Document, Schema} from "mongoose";
import { ABONEMENT_TARIF_REDUIT, ABONNEMENT_TARIF_NORMAL } from "../utils/constantes";


export interface IAbonement extends Document {
    _id: mongoose.Types.ObjectId;
    nom: string;
    slug: string;
    url: string;
    participants: string[];
}

const abonementSchema = new Schema({
    nom: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true,
        index: true
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true,
        index: true
    },
    url: { 
        type: String, 
        required: true 
    },
    participants: [{ 
        type: mongoose.Types.ObjectId, // Correction ici - pas de double brackets
        ref: "User" 
    }]
});

const Abonement = mongoose.model<IAbonement>("Abonement", abonementSchema);
export default Abonement;