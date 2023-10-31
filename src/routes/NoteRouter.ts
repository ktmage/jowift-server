import express from 'express';
import NoteController from '../controller/NoteController';

const router = express.Router();

router.post('/', NoteController.Create);

export default router;
