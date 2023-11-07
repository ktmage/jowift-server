import express from 'express';
import session from 'express-session';
import Router from './routes';
import { PrismaClient } from '@prisma/client';
import { getEnvVariable } from './utility';

// prismaでセッションを管理するためのミドルウェア
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

// 環境変数の読み込み
const PORT = Number(getEnvVariable('PORT'));
const SESSION_LIMIT_DAYS = Number(getEnvVariable('SESSION_LIMIT_DAYS'));
const SESSION_SECRET = getEnvVariable('SESSION_SECRET');
const SESSION_CHECK_PERIOD_MINUTES = Number(getEnvVariable('SESSION_CHECK_PERIOD_MINUTES'));

const app: express.Express = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});

// jsonを読むための設定
app.use(express.json());

// express-sessionの設定
app.use(
	session({
		cookie: {
			maxAge: SESSION_LIMIT_DAYS * 24 * 60 * 60 * 1000,
		},
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new PrismaSessionStore(new PrismaClient(), {
			checkPeriod: SESSION_CHECK_PERIOD_MINUTES * 60 * 1000,
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	}),
);

// express-sessionの型拡張
declare module 'express-session' {
	interface SessionData {
		userId: number;
	}
}

app.use((req, res, next) => {
	console.log(req.session.id);
	next();
});

// ルーティングの設定
app.use('/', Router);

// サーバーの起動
app.listen(PORT, () => {
	console.log(`Start >> http://localhost:${PORT}`);
});
