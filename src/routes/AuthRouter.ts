import express from 'express';
import authController from '../controller/AuthController';

const router = express.Router();

router.post('/login', authController.Login);
router.post('/signup', authController.SignUp);

export default router;
