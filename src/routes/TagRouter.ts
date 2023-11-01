import express from 'express';
import TagController from '../controller/TagController';

const router = express.Router();


router.post('/', TagController.Create)

export default router;
