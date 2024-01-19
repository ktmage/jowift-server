import express from 'express';
import authController from '../controller/AuthController';

const router = express.Router();

router.get('/', authController.Session);
router.post('/login', authController.Login);
router.post('/signup', authController.SignUp);
router.get('/logout', authController.Logout);
router.get('/user', authController.getUser);
router.delete('/user', authController.deleteUser);

export default router;
