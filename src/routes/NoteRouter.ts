import express from 'express';
import NoteController from '../controller/NoteController';

const router = express.Router();

router.post('/', NoteController.post);
router.get('/', NoteController.getAll);
router.get('/:noteId', NoteController.getById);
router.put('/:noteId', NoteController.update);
router.delete('/:noteId', NoteController.delete);

export default router;
