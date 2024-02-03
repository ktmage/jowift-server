import path from 'path';
import express from 'express';
import Router from './routes';
import { PORT } from './config';
import { cors, session, auth } from './middleware';

// expressの設定
const app = express();

// jsonを読むための設定
app.use(express.json());

// 認証の設定
app.use(auth);

// CORSの設定
app.use(cors);

// セッションの設定
app.use(session);

// 静的ファイルの設定
app.use(express.static(path.join(path.resolve(__dirname, '../public'))));

// ルーティングの設定
app.use('/api', Router);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// サーバーの起動
app.listen(PORT, () => {
	console.log('>> server started.');
});
