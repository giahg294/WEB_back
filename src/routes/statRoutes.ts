import { Router } from "express";
import { statController } from "../controllers/statController";
import { userController } from '../controllers/UserController';

const router = Router();

router.get("/getEvent", statController.getEventName);
router.get("/getAdhesion", userController.middleware, statController.getAdhesion);
router.get("/getPayment", userController.middleware, statController.getPayment);
router.get("/getParticipantsDetailsByEvent", userController.middleware, statController.getParticipantsDetailsByEvent);
router.get("/getParticipanByEvent", userController.middleware, statController.getParticipantsByEvent);
router.get("/getTimeBasedAdhesionPayment", userController.middleware, statController.getTimeBasedAdhesionPayment);
router.get("/getTotalMoneyTimeBasedPayment", userController.middleware, statController.getTimeBasedMoneyTotal);
router.get("/getTotalMoneyTimeBasedAdhesion", userController.middleware, statController.getTimeBasedMoneyAdhesion);
router.get("/getTotalMoneyTimeBasedEvent", userController.middleware, statController.getTimebasedMoneyEvent);
router.get("/getAbonnement", statController.getAbonementDetails);
export default router;