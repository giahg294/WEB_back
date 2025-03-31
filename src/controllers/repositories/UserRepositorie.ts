import mongoose from "mongoose";
import User, { IUser } from "../../model/User";

export interface CreateUserData {
  nom: string;
  prenom: string;
  email: string;
  adhesion?: mongoose.Types.ObjectId[];
}

export class UserRepository {
  getUserByEmail = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email });
    return user;
  };
  getUserIdByEmail = async (email: string): Promise<mongoose.Types.ObjectId | undefined> => {
    const user = await User.findOne({ email });
    return user?._id;
  };
  create = async (userData: CreateUserData): Promise<IUser> => {
    const newUser = new User({
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      adhesion: userData.adhesion || [],
    });
    try {
      return await newUser.save();
    } catch (error) {
      throw new Error("Error while saving user: " + error);
    }
  };
  getNonAdherentUsers = async (): Promise<IUser[]> => {
    const data:IUser[] = await User.find();
    const filteredData = data.filter(User => User.adhesion.length == 0);
    return filteredData;
  }
}


export const userRepository = new UserRepository();