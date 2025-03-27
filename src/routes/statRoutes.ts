import { Router } from "express";
import { statController } from "../controllers/statController";

const router = Router();

router.get("/getEvent", statController.getEventName);
router.get("/getAdhesion", statController.getAdhesion);
router.get("/getPayment", statController.getPayment);

export default router;