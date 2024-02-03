import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import googleStrategy from './googleStrategy';
import express from 'express';

const prisma = new PrismaClient();

const router = express.Router();

//
passport.use(googleStrategy);

passport.serializeUser((userId, done) => {
	done(null, userId);
});

passport.deserializeUser(async (userId, done) => {
	const user = await prisma.user.findUnique({ where: { id: userId as string } });
	if (user) {
		done(null, {
			id: user.id.toString(),
			name: user.name,
			email: user.email,
			photo: user.photoUrl,
		});
	} else {
		done(new Error('User not found'), false);
	}
});
// passportの初期化
router.use(passport.initialize());

export default router;
