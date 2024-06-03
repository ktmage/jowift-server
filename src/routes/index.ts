import express from 'express';
import { isAuthenticated } from '../middleware';
import AuthRouter from './AuthRouter';
import NoteRouter from './NoteRouter';
import TagRouter from './TagRouter';

const router = express.Router();

// 認証用のルーティング
router.use('/auth', AuthRouter);

// 認証が必要なルーティング
router.use(isAuthenticated);

router.use('/note', NoteRouter);
router.use('/tag', TagRouter);

export default router;
