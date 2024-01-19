import { Request, Response } from 'express';
import NoteService from '../service/NoteService';

class NoteController {
	static async post(req: Request, res: Response) {
		const { title, content, tagId } = req.body;
		if (!title || !content || !tagId) {
			return res.status(400).json({ error: 'invalid request.' });
		}

		const userId = req.session.userId;
		if (!userId) {
			return res.status(400).json({ error: 'invalid session.' });
		}

		const result = await NoteService.post({ title, content }, userId, tagId);
		if (result.status) {
			return res.status(200).json({ message: 'success.', id: result.data });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}

	static async getById(req: Request, res: Response) {
		const { noteId } = req.params;
		if (!noteId) {
			return res.status(400).json({ error: 'invalid request.' });
		}

		const userId = req.session.userId;
		if (!userId) {
			return res.status(400).json({ error: 'invalid session.' });
		}

		const result = await NoteService.getById(noteId, userId);
		if (result.status) {
			return res.status(200).json({ note: result.data });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}

	static async getAll(req: Request, res: Response) {
		const userId = req.session.userId;
		if (!userId) {
			return res.status(400).json({ error: 'invalid session.' });
		}

		const result = await NoteService.getAll(userId);
		if (result.status) {
			return res.status(200).json({ notes: result.data });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}

	static async update(req: Request, res: Response) {
		const { noteId } = req.params;
		if (!noteId) {
			return res.status(400).json({ error: 'invalid request.' });
		}

		const { title, content, tagId } = req.body;
		if (!title || !content || !tagId) {
			return res.status(400).json({ error: 'invalid request.' });
		}

		const result = await NoteService.update(noteId, { title, content }, tagId);
		if (result.status) {
			return res.status(200).json({ message: 'success.' });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}

	static async delete(req: Request, res: Response) {
		const { noteId } = req.params;
		if (!noteId) {
			return res.status(400).json({ error: 'invalid request.' });
		}

		const result = await NoteService.delete(noteId);
		if (result.status) {
			return res.status(200).json({ message: 'success.' });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}
}

export default NoteController;
