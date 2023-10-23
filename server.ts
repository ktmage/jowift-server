import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index';

// 環境変数の読み込み
dotenv.config();

const app: express.Express = express();
const PORT = process.env.PORT;

// ルーティングの設定
app.use("/api", router);

// サーバーの起動
app.listen(PORT, () => {
	console.log(`Start on port ${PORT}.`);
});