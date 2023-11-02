import express from 'express';
import TagController from '../controller/TagController';

const router = express.Router();


router.post('/', TagController.Create)
router.post('/:id/rename',)

export default router;
