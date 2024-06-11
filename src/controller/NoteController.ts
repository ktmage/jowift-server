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

			const createdNote = await NoteModel.create(title, content, userId, tagId);
			res.status(200).json({
				id: createdNote.id,
				title: createdNote.title,
				content: createdNote.content,
				tags: createdNote.tags.map((tag) => ({
					id: tag.id,
					name: tag.name,
					createdAt: tag.createdAt,
					updatedAt: tag.updatedAt,
				})),
				createdAt: createdNote.createdAt,
				updatedAt: createdNote.updatedAt,
			});
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
			res.status(200).json(
				notes.map((note) => ({
					id: note.id,
					title: note.title,
					content: note.content,
					tags: note.tags.map((tag) => ({
						id: tag.id,
						name: tag.name,
						createdAt: tag.createdAt,
						updatedAt: tag.updatedAt,
					})),
					createdAt: note.createdAt,
					updatedAt: note.updatedAt,
				})),
			);
		} catch (e) {
			next(e);
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const { noteId } = req.params;

			// TODO: デバッグ用
			// if (noteId === "35f6f003-efd2-4cea-838a-a4fd8df2c353") {
			//     throw new ServiceError('特別なエラーが発生しました。');
			// }

			if (!noteId) {
				throw new Error('invalid request.');
			}

			const userId = req.session.userId ?? req.user?.id;

			if (!userId) {
				throw new Error('no active session.');
			}

			const note = await NoteModel.getById(noteId, userId);
			res.status(200).json({
				id: note.id,
				title: note.title,
				content: note.content,
				tags: note.tags.map((tag) => ({
					id: tag.id,
					name: tag.name,
					createdAt: tag.createdAt,
					updatedAt: tag.updatedAt,
				})),
				createdAt: note.createdAt,
				updatedAt: note.updatedAt,
			});
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

			const updatedNote = await NoteModel.update(noteId, title, content, tagId);
			res.status(200).json({
				id: updatedNote.id,
				title: updatedNote.title,
				content: updatedNote.content,
				tags: updatedNote.tags.map((tag) => ({
					id: tag.id,
					name: tag.name,
					createdAt: tag.createdAt,
					updatedAt: tag.updatedAt,
				})),
				createdAt: updatedNote.createdAt,
				updatedAt: updatedNote.updatedAt,
			});
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

			const deletedNote = await NoteModel.delete(noteId);
			res.status(200).json({
				id: deletedNote.id,
			});
		} catch (e) {
			next(e);
		}
	}
}

export default NoteController;
