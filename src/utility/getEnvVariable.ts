import 'dotenv/config';
export default function getEnvVariable(key: string) {
	const value = process.env[key];
	if (!value) {
		throw new Error(`${key} is not set.`);
	}
	return value;
}
