import { Router } from 'express';
import { emailController } from '../controllers/EmailController';

const router = Router();

router.post('/illegalUser', emailController.sendEmailToIllegalUsers);
export default router;
