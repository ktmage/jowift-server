import express from 'express';
import AuthRouter from './AuthRouter';
import NoteRouter from './NoteRouter';
// import isAuthenticated from '../middleware/isAuthenticated';

const router = express.Router();

router.use('/auth', AuthRouter);

// 一旦アクセス制限を無効化
// router.use(isAuthenticated);

router.use('/note', NoteRouter);

export default router;