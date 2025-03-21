import { PaymentType } from "../../model/Payment";
import { AdhesionRepository } from "../repositories/AdhesionRepository";
import { PaymentRepository } from "../repositories/PaymentRepositorie";
import { UserRepository } from "../repositories/UserRepositorie";

const paymentRepository = new PaymentRepository();
const adhesionRepository = new AdhesionRepository();
const userRepository = new UserRepository();

export interface PaymentAdhesionData {
    type: PaymentType;
    amount: number;
    membershipName: string;
    nom: string;
    prenom: string;
    email: string;
}

export async function handleAdhesionPayment(adhesionData: PaymentAdhesionData) {
    const adhesion = await adhesionRepository.getAdhesionByName(adhesionData.membershipName);
    if (!adhesion) {
        throw new Error("Adhesion not found");
    }
    
    const isUserExisting = await userRepository.getUserByEmail(adhesionData.email);
    let userId;

    if(!isUserExisting) {
        const newUser = await userRepository.create({
            nom:adhesionData.nom,
            prenom: adhesionData.prenom,
            email: adhesionData.email,
            adhesion: [adhesion._id],
        })
        userId = newUser._id;
    } else {
        userId = isUserExisting._id; 
    }

    await adhesionRepository.addUserToAdhesion(adhesionData.membershipName, userId);

    const paymentData = {
        type: adhesionData.type,
        amount: adhesionData.amount,
        userid: userId,
        membershipidOrEventId: adhesion._id,
    };
    return await paymentRepository.create(paymentData);
}
