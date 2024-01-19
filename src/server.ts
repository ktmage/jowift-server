import express from 'express';
import session from 'express-session';
import Router from './routes';
import { PrismaClient } from '@prisma/client';
import { getEnvVariable } from './utility';
import cors from 'cors';

// prismaでセッションを管理するためのミドルウェア
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import path from 'path';

// 環境変数の読み込み
const PORT = Number(getEnvVariable('PORT'));
const CORS_ALLOW_ORIGIN = getEnvVariable('CORS_ALLOW_ORIGIN');
const CORS_ALLOW_METHODS = getEnvVariable('CORS_ALLOW_METHODS');
const CORS_ALLOW_HEADERS = getEnvVariable('CORS_ALLOW_HEADERS');
const SESSION_LIMIT_DAYS = Number(getEnvVariable('SESSION_LIMIT_DAYS'));
const SESSION_SECRET = getEnvVariable('SESSION_SECRET');
const SESSION_CHECK_PERIOD_MINUTES = Number(getEnvVariable('SESSION_CHECK_PERIOD_MINUTES'));
const COOKIE_SAME_SITE = <boolean | 'lax' | 'strict' | 'none'>getEnvVariable('COOKIE_SAME_SITE');
const COOKIE_SECURE = getEnvVariable('COOKIE_SECURE') === "true";
const COOKIE_HTTP_ONLY = getEnvVariable('COOKIE_HTTP_ONLY') === "true";
const COOKIE_DOMAIN = getEnvVariable('COOKIE_DOMAIN');

// CORSの設定
const corsOptions: cors.CorsOptions = {
	origin: CORS_ALLOW_ORIGIN,
	methods: CORS_ALLOW_METHODS,
	allowedHeaders: CORS_ALLOW_HEADERS,
	credentials: true,
}

// Cookieの設定
const cookieOptions: express.CookieOptions = {
	maxAge: SESSION_LIMIT_DAYS * 24 * 60 * 60 * 1000,
	sameSite: COOKIE_SAME_SITE,
	secure: COOKIE_SECURE,
	httpOnly: COOKIE_HTTP_ONLY,
	domain: COOKIE_DOMAIN,
}

console.log(corsOptions);
console.log(cookieOptions);

const sessionOptions: session.SessionOptions = {
	cookie: cookieOptions,
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: new PrismaSessionStore(new PrismaClient(), {
		checkPeriod: SESSION_CHECK_PERIOD_MINUTES * 60 * 1000,
		dbRecordIdIsSessionId: true,
		dbRecordIdFunction: undefined,
	}),
}

// express-sessionの型拡張
declare module 'express-session' {
	interface SessionData {
		userId: number;
	}
}

// expressの設定
const app: express.Express = express();

// jsonを読むための設定
app.use(express.json());

// corsの設定
app.use(cors(corsOptions));

// sessionの設定
app.use(session(sessionOptions));

// 静的ファイルの設定
app.use(express.static(path.join(path.resolve(__dirname, '../public'))));

// ルーティングの設定
app.use('/api', Router);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// サーバーの起動
app.listen(PORT, () => {
	console.log(`Start >> http://localhost:${PORT}`);
});
