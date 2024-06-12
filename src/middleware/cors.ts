import cors from 'cors';
import { CORS } from '../config';
import express from 'express';

// CORSの設定
const corsOptions: cors.CorsOptions = {
	origin: CORS.ALLOW_ORIGIN,
	methods: CORS.ALLOW_METHODS,
	allowedHeaders: CORS.ALLOW_HEADERS,
	credentials: true,
};

const router = express.Router();

router.use(cors(corsOptions));

export default router;
