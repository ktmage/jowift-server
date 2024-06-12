import express from 'express';
import { PrismaClient } from '@prisma/client';
import { GOOGLE_OAUTH } from '@/config';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
const GoogleStrategy = passportGoogle.Strategy;

const router = express.Router();

const prisma = new PrismaClient();

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
	const user = await prisma.user.findUnique({ where: { id: userId as string } });
	if (user) {
		done(null, user);
	} else {
		done(null, false);
	}
});

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_OAUTH.CLIENT_ID,
			clientSecret: GOOGLE_OAUTH.CLIENT_SECRET,
			callbackURL: GOOGLE_OAUTH.CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			process.nextTick(async () => {
				const user = await prisma.user.upsert({
					where: { email: profile.emails ? profile.emails[0].value : '' },
					update: { name: profile.displayName },
					create: {
						name: profile.displayName,
						email: profile.emails ? profile.emails[0].value : '',
						photoUrl: profile.photos ? profile.photos[0].value : '',
						id: profile.id,
						authMethod: 'GOOGLE',
					},
				});
				return done(null, user);
			});
		},
	),
);

// passportの初期化
router.use(passport.initialize());

export default router;
