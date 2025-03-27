import mongoose, { Document, Schema } from "mongoose";

export interface IAdhesion extends Document {
  _id: mongoose.Types.ObjectId;
  nom: string;
  url: string;
  participants: mongoose.Types.ObjectId[];
}

const adhesionSchema = new Schema({
  nom: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    index: true // Ajoute un index pour améliorer les performances des recherches
  },
  url: { 
    type: String, 
    required: true 
  },
  participants: [{ 
    type: mongoose.Types.ObjectId, // Correction ici - pas de double brackets
    ref: "User" 
  }],
});

// Ajouter un message d'erreur personnalisé pour les violations d'unicité
adhesionSchema.post('save', function(error: any, doc: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Une adhésion avec ce nom existe déjà'));
  } else {
    next(error);
  }
});

const Adhesion = mongoose.model<IAdhesion>("Adhesion", adhesionSchema);

export default Adhesion;