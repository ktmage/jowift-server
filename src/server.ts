import express from 'express';
import session from 'express-session';
import Router from './routes';
import { PrismaClient } from '@prisma/client';
import { getEnvVariable } from './utility';
// import cors from 'cors';

// prismaでセッションを管理するためのミドルウェア
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import path from 'path';

// 環境変数の読み込み
const PORT = Number(getEnvVariable('PORT'));
const SESSION_LIMIT_DAYS = Number(getEnvVariable('SESSION_LIMIT_DAYS'));
const SESSION_SECRET = getEnvVariable('SESSION_SECRET');
const SESSION_CHECK_PERIOD_MINUTES = Number(getEnvVariable('SESSION_CHECK_PERIOD_MINUTES'));
// const ALLOW_ORIGIN = getEnvVariable('ALLOW_ORIGIN');
// const ALLOW_METHODS = getEnvVariable('ALLOW_METHODS');
// const ALLOW_HEADERS = getEnvVariable('ALLOW_HEADERS');
// const SAME_SITE = <boolean | 'lax' | 'strict' | 'none'>getEnvVariable('SAME_SITE');
// const SECURE = Boolean(getEnvVariable('SECURE'));
const HTTP_ONLY = Boolean(getEnvVariable('HTTP_ONLY'));
// const DOMAIN = getEnvVariable('DOMAIN');


// const corsOptions: cors.CorsOptions = {
// 	origin: ALLOW_ORIGIN,
// 	methods: ALLOW_METHODS,
// 	allowedHeaders: ALLOW_HEADERS,
// 	credentials: true,
// }

const cookieOptions: express.CookieOptions = {
	maxAge: SESSION_LIMIT_DAYS * 24 * 60 * 60 * 1000,
	// sameSite: SAME_SITE,
	// secure: SECURE,
	httpOnly: HTTP_ONLY,
	// domain: DOMAIN,
}

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
// app.use(cors(corsOptions));

// sessionの設定
app.use(session(sessionOptions));

// 静的ファイルの設定
app.use(express.static(path.join(__dirname, 'public')));

// ルーティングの設定
app.use('/api', Router);

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

// サーバーの起動
app.listen(PORT, () => {
	console.log(`Start >> http://localhost:${PORT}`);
});
