import express from 'express';
import { isAuthenticated } from '../middlewares';
import authRouter from './auth-router';
import noteRouter from './note-router';
import tagRouter from './tag-router';

const router = express.Router();

// 認証用のルーティング
router.use('/auth', authRouter);

// 認証が必要なルーティング
router.use(isAuthenticated);

router.use('/note', noteRouter);
router.use('/tag', tagRouter);

export default router;
