import { Request, Response } from 'express';
import PostService from '../service/NoteService';

// TODO: 📝NoteControllerでNoteを作成する段階で、Tagとの紐づけも良しなにしたい。

class NoteController {
	static async Create(req: Request, res: Response) {
		const { title, content, tagId } = req.body;
		if (!title || !content || !tagId) {
			return res.status(400).json({ error: 'invalid request.' });
		}

		const userId = req.session.userId;
		if (!userId) {
			return res.status(400).json({ error: 'invalid session.' });
		}

		const result = await PostService.Post({title, content}, userId, tagId);
		if (result.status) {
			return res.status(200).json({ message: 'success.' });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}
}

export default NoteController;
