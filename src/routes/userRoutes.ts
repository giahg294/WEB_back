import { Router } from 'express';
import { userController } from '../controllers/UserController';

const router = Router();


router.post('/login', userController.login);
router.get('/admin/dashboard', userController.dashboard);
router.get('/getillegaux', userController.getIllegaux);

export default router;
