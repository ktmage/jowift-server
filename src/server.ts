import dotenv from 'dotenv';
import express from 'express';
// import session from 'express-session';
import cookieSession from 'cookie-session';
// import UserRouter from './routes/users';
// import NoteRouter from './routes/notes';
// import AuthRouter from './routes/auth';
import Router from './routes';

// 環境変数の読み込み
dotenv.config();

const app: express.Express = express();
const PORT = process.env.PORT;

// jsonを読むための設定
app.use(express.json());

// express-sessionの場合
// 🔍Docs: https://github.com/expressjs/session
// app.use(session({
// 	secret: 'secret',
// 	resave: false,
// 	saveUninitialized: false,
// 	store: new session.MemoryStore(),
// 	cookie: {
// 		httpOnly: true,
// 		secure: false,
// 		maxAge: 1000 * 60 * 30
// 	}
// }))

// cookie-sessionの場合
app.use(
	cookieSession({
		name: 'session', // Cookieの名前
		keys: ['key1', 'key2'], // 署名用の秘密鍵 // keys[0]は暗号化用、それ以外は
		maxAge: 1000 * 60 * 30, // Cookieの有効期限
	}),
);

declare module 'express-session' {
	interface SessionData {
		userId: number;
		userName: string;
	}
}



// ルーティングの設定
app.use('/', Router);

// サーバーの起動
app.listen(PORT, () => {
	console.log(`Start on port ${PORT}.`);
});
