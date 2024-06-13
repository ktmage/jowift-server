import express from 'express';
import { TagController } from '../controllers';

const router = express.Router();

router.post('/', TagController.create);
router.get('/', TagController.getAll);
router.get('/:tagId', TagController.getById);
router.put('/:tagId', TagController.update);
router.delete('/:tagId', TagController.delete);

export default router;
