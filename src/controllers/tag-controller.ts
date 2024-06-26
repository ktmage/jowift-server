import { NextFunction, Request, Response } from 'express';
import { TagModel } from '../models';

class TagController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { name } = req.body;

			if (!name) {
				throw new Error('invalid request.');
			}

			const userId = req.session.userId ?? req.user?.id;

			if (!userId) {
				throw new Error('no active session.');
			}

			const createdTag = await TagModel.create(name, userId);
			res.status(200).json({
				id: createdTag.id,
				name: createdTag.name,
				createdAt: createdTag.createdAt,
				updatedAt: createdTag.updatedAt,
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

			const tags = await TagModel.getAll(userId);
			res.status(200).json(
				tags.map((tag) => ({
					id: tag.id,
					name: tag.name,
					createdAt: tag.createdAt,
					updatedAt: tag.updatedAt,
				})),
			);
		} catch (e) {
			next(e);
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const { tagId } = req.params;

			if (!tagId) {
				throw new Error('invalid request.');
			}

			const tag = await TagModel.getById(tagId);
			res.status(200).json({
				id: tag.id,
				name: tag.name,
				createdAt: tag.createdAt,
				updatedAt: tag.updatedAt,
			});
		} catch (e) {
			next(e);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { name } = req.body;
			const { tagId } = req.params;
			if (!name || !tagId) {
				throw new Error('invalid request.');
			}

			const updatedTag = await TagModel.update(tagId, name);
			res.status(200).json({
				id: updatedTag.id,
				name: updatedTag.name,
				createdAt: updatedTag.createdAt,
				updatedAt: updatedTag.updatedAt,
			});
		} catch (e) {
			next(e);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { tagId } = req.params;
			if (!tagId) {
				throw new Error('invalid request.');
			}

			const deletedTag = await TagModel.delete(tagId);
			res.status(200).json({
				id: deletedTag.id,
			});
		} catch (e) {
			next(e);
		}
	}
}

export default TagController;
