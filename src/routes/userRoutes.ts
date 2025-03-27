import { Router } from 'express';
import { userController } from '../controllers/UserController';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);
router.get('/admin/dashboard', userController.authorize, userController.dashboard);

export default router;
