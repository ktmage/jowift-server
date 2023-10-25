import express from 'express';
import UserController from '../controller/userController';

const router = express.Router();

router.get('/user', UserController.read);
router.post('/user', UserController.create);

export default router;
