import { PrismaClient } from '@prisma/client';
import { COOKIE, SESSION } from '../config';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import express from 'express';
import session from 'express-session';
import passport from 'passport';

// Cookieの設定
const cookieOptions: express.CookieOptions = {
	maxAge: SESSION.LIMIT_DAYS * 24 * 60 * 60 * 1000,
	sameSite: COOKIE.SAME_SITE,
	secure: COOKIE.SECURE,
	httpOnly: COOKIE.HTTP_ONLY,
	domain: COOKIE.DOMAIN,
};

const sessionOptions: session.SessionOptions = {
	cookie: cookieOptions,
	secret: SESSION.SECRET,
	resave: false,
	// セッションにデータが追加されるまでセッションはストアに保存されない。
	saveUninitialized: false,
	store: new PrismaSessionStore(new PrismaClient(), {
		checkPeriod: SESSION.CHECK_PERIOD_MINUTES * 60 * 1000,
		dbRecordIdIsSessionId: true,
		dbRecordIdFunction: undefined,
	}),
};

declare module 'express-session' {
	interface SessionData {
		userId: string;
		passport: {
			user: string;
		};
	}
}

const router = express.Router();

router.use(session(sessionOptions));
router.use(passport.session());

export default router;
