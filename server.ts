import dotenv from 'dotenv';
import express from 'express';
import UserRouter from './routes/users';
import NoteRouter from './routes/notes';

// 環境変数の読み込み
dotenv.config();

const app: express.Express = express();
const PORT = process.env.PORT;

// jsonを読むための設定
app.use(express.json());

// ルーティングの設定
app.use("/api", UserRouter);
app.use("/api", NoteRouter);

// サーバーの起動
app.listen(PORT, () => {
	console.log(`Start on port ${PORT}.`);
});