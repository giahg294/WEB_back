import { Router } from "express";
import { statController } from "../controllers/statController";

const router = Router();

router.get("/getEvent", statController.getEvent);

export default router;