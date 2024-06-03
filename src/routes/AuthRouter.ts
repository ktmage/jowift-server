import express from 'express';
import authController from '../controller/AuthController';
import passport from 'passport';
import { CORS } from '../config';

const router = express.Router();

router.get('/', authController.session);
router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.get('/logout', authController.logout);

router.get('/user', authController.getUser);
router.delete('/user', authController.deleteUser);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: CORS.ALLOW_ORIGIN,
		failureRedirect: CORS.ALLOW_ORIGIN,
		session: true,
	}),
);

export default router;
