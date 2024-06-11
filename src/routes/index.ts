import express from 'express';
import { isAuthenticated } from '@/middleware';
import authRouter from './authRouter';
import noteRouter from './noteRouter';
import tagRouter from './tagRouter';

const router = express.Router();

// 認証用のルーティング
router.use('/auth', authRouter);

// 認証が必要なルーティング
router.use(isAuthenticated);

router.use('/note', noteRouter);
router.use('/tag', tagRouter);

export default router;
