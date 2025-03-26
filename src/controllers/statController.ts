import e, { Request, Response } from "express";
import { eventRepository } from "./repositories/EventRepositorie";
import { adhesionRepository } from "./repositories/AdhesionRepository";
import { paymentRepository } from "./repositories/PaymentRepositorie";
export class StatController {
    getAdhesion = async (req: Request, res: Response): Promise<void> => {
        try {
            const adhesion = await adhesionRepository.getAllAdhesions();
            const data = adhesion.map((adhesion) => ({ nom: adhesion.nom, url: adhesion.url }));
            res.json({
                data
            });
        } catch (err: any) {
            res.status(500).json({message: err.message});
        }
    }
    getEventName = async (req: Request, res: Response): Promise<void> => {
        try{
            const events = await eventRepository.getAllEvents();
            console.log(events);
            const data = events.map((event) => ({ nom: event.nom, url: event.url }));
            console.log(data);
            res.json({
                data
            });
        } catch(err: any) {
            res.status(500).json({message: err.message});
        }
    }
    getPayment = async (req: Request, res: Response): Promise<void> => {
        try {
            const payments = await paymentRepository.getAllPayments();
            const data = payments.map((payment) =>({
                nom: 'nom' in payment.userid ? payment.userid.nom : null,
                prenom:'prenom' in payment.userid ? payment.userid.prenom : null,
                email: 'email' in payment.userid ? payment.userid.email : null,
                type: payment.type,
                amount: payment.amount/100,
                createdAt: payment.createdAt
            }))
            res.json(data);
        } catch (err: any) {
            res.status(500).json({message: err.message});
        }
    }
}

export const statController = new StatController();