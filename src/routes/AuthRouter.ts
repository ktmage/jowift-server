import express from 'express';
import { AuthController } from '../controller';
import passport from 'passport';
import { CORS } from '../config';

const router = express.Router();

router.get('/', AuthController.session);
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signUp);
router.get('/logout', AuthController.logout);

router.get('/user', AuthController.getUser);
router.delete('/user', AuthController.deleteUser);

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
