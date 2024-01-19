import dotenv from 'dotenv';
import path from 'path';

// 環境変数の読み込み
const nodeEnv = process.env.NODE_ENV || 'development';

// .envファイルの読み込み
dotenv.config({ path: path.resolve(process.cwd(), `.env.${nodeEnv}.local`) });

export default function getEnvVariable(key: string) {
	const value = process.env[key];
	if (!value) {
		throw new Error(`${key} is not set.`);
	}
	return value;
}
