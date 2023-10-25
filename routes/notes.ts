import express from 'express';
import NoteController from '../controller/noteController';

const router = express.Router();

router.get('/note', NoteController.read);
router.post('/note', NoteController.create);

export default router;
