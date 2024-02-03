import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Profile } from 'passport';
import { GOOGLE_OAUTH } from '../../config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const googleStrategy = new GoogleStrategy(
	{
		clientID: GOOGLE_OAUTH.CLIENT_ID,
		clientSecret: GOOGLE_OAUTH.CLIENT_SECRET,
		callbackURL: GOOGLE_OAUTH.CALLBACK_URL,
	},
	async (
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: (error: null, id: string) => void,
	) => {
		process.nextTick(async () => {
			await prisma.user.upsert({
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
			return done(null, profile.id);
		});
	},
);

export default googleStrategy;
