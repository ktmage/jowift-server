import { NextFunction, Request, Response } from 'express';
import { NoteModel } from '../models';

class NoteController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, content, tagId } = req.body;
			if (!title || !content || !tagId) {
				throw new Error('invalid request.');
			}

			const userId = req.session.userId ?? req.user?.id;

			if (!userId) {
				throw new Error('no active session.');
			}

			const id = await NoteModel.create({ title, content }, userId, tagId);
			res.status(200).json({ id });
		} catch (e) {
			next(e);
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const { noteId } = req.params;
			if (!noteId) {
				throw new Error('invalid request.');
			}

			const userId = req.session.userId ?? req.user?.id;

			if (!userId) {
				throw new Error('no active session.');
			}

			const note = await NoteModel.getById(noteId, userId);
			res.status(200).json({ note });
		} catch (e) {
			next(e);
		}
	}

	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.session.userId ?? req.user?.id;

			if (!userId) {
				throw new Error('no active session.');
			}

			const notes = await NoteModel.getAll(userId);
			res.status(200).json({ notes });
		} catch (e) {
			next(e);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { noteId } = req.params;
			if (!noteId) {
				throw new Error('invalid request.');
			}

			const { title, content, tagId } = req.body;
			if (!title || !content || !tagId) {
				throw new Error('invalid request.');
			}

			await NoteModel.update(noteId, { title, content }, tagId);
			res.status(200).json({ message: 'success.' });
		} catch (e) {
			next(e);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { noteId } = req.params;
			if (!noteId) {
				throw new Error('invalid request.');
			}

			await NoteModel.delete(noteId);
			res.status(200).json({ message: 'success.' });
		} catch (e) {
			next(e);
		}
	}
}

export default NoteController;
