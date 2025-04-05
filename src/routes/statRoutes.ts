import { Router } from "express";
import { statController } from "../controllers/statController";
import { userController } from '../controllers/UserController';

const router = Router();

router.get("/getEvent", statController.getEventName);
router.get("/getAdhesion", statController.getAdhesion);
router.get("/getPayment", statController.getPayment);
router.get("/getParticipantsDetailsByEvent", statController.getParticipantsDetailsByEvent);
router.get("/getParticipanByEvent", statController.getParticipantsByEvent);
router.get("/getTimeBasedAdhesionPayment", statController.getTimeBasedAdhesionPayment);
router.get("/getTotalMoneyTimeBasedPayment", statController.getTimeBasedMoneyTotal);
router.get("/getTotalMoneyTimeBasedAdhesion", statController.getTimeBasedMoneyAdhesion);
router.get("/getTotalMoneyTimeBasedEvent", statController.getTimebasedMoneyEvent);
router.get("/getAbonnement", statController.getAbonementDetails);

export default router;