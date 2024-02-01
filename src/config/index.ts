import { getEnvVariable } from '../utility';

export const CORS = {
	ALLOW_ORIGIN: getEnvVariable('CORS_ALLOW_ORIGIN'),
	ALLOW_METHODS: getEnvVariable('CORS_ALLOW_METHODS'),
	ALLOW_HEADERS: getEnvVariable('CORS_ALLOW_HEADERS'),
};

export const COOKIE = {
	SAME_SITE: <boolean | 'lax' | 'strict' | 'none'>getEnvVariable('COOKIE_SAME_SITE'),
	SECURE: getEnvVariable('COOKIE_SECURE') === 'true',
	HTTP_ONLY: getEnvVariable('COOKIE_HTTP_ONLY') === 'true',
	DOMAIN: getEnvVariable('COOKIE_DOMAIN'),
};

export const SESSION = {
	SECRET: getEnvVariable('SESSION_SECRET'),
	LIMIT_DAYS: Number(getEnvVariable('SESSION_LIMIT_DAYS')),
	CHECK_PERIOD_MINUTES: Number(getEnvVariable('SESSION_CHECK_PERIOD_MINUTES')),
};

export const GOOGLE_OAUTH = {
	CLIENT_ID: getEnvVariable('GOOGLE_CLIENT_ID'),
	CLIENT_SECRET: getEnvVariable('GOOGLE_CLIENT_SECRET'),
	CALLBACK_URL: getEnvVariable('GOOGLE_CALLBACK_URL'),
};

export const PORT = Number(getEnvVariable('PORT'));
