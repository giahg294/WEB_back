import { Router } from "express";
import { statController } from "../controllers/statController";
import { userController } from '../controllers/UserController';

const router = Router();

// Event
router.get("/getEvent", statController.getEventName);
router.get("/getParticipantsDetailsByEvent", statController.getParticipantsDetailsByEvent);
router.post("/updateEvent", statController.updateEvent);

// Adhesion
router.get("/getAdhesion", statController.getAdhesion);
router.get("/getAdhesionMembers", statController.getAdhesionMembers);


// Charts 
router.get("/getTimeBasedAdhesionPayment", statController.getTimeBasedAdhesionPayment);
router.get("/getTotalMoneyTimeBasedPayment", statController.getTimeBasedMoneyTotal);
router.get("/getTotalMoneyTimeBasedAdhesion", statController.getTimeBasedMoneyAdhesion);
router.get("/getTotalMoneyTimeBasedEvent", statController.getTimebasedMoneyEvent);

// Autres
router.get("/getAbonnement", statController.getAbonementDetails);
router.get("/getPayment", statController.getPayment);
router.get("/getParticipanByEvent", statController.getParticipantsByEvent);


export default router;