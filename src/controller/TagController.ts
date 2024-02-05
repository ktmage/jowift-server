import { Request, Response } from 'express';
import TagService from '../service/TagService';

class TagController {
	static async create(req: Request, res: Response) {
		const { name } = req.body;
		if (!name) {
			return res.status(400).json({ error: 'invalid request.' });
		}

		const userId = req.session.userId ?? req.user?.id;

		if (!userId) {
			return res.status(400).json({ error: 'invalid session.' });
		}

		const result = await TagService.create(name, userId);
		if (result.status) {
			return res.status(200).json({ message: 'success.', id: result.data });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}

	static async getAll(req: Request, res: Response) {
		const userId = req.session.userId ?? req.user?.id;

		if (!userId) {
			return res.status(400).json({ error: 'invalid session.' });
		}

		const result = await TagService.getAll(userId);
		if (result.status) {
			return res.status(200).json({ tags: result.data });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}

	static async getById(req: Request, res: Response) {
		const { tagId } = req.params;
		if (!tagId) {
			return res.status(400).json({ error: 'invalid request.' });
		}

		const result = await TagService.getById(tagId);
		if (result.status) {
			return res.status(200).json({ tag: result.data });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}

	static async rename(req: Request, res: Response) {
		const { name } = req.body;
		const { tagId } = req.params;
		if (!name || !tagId) {
			return res.status(400).json({ error: 'invalid request.' });
		}

		const result = await TagService.rename(name, tagId);
		if (result.status) {
			return res.status(200).json({ message: 'success.' });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}

	static async delete(req: Request, res: Response) {
		const { tagId } = req.params;
		if (!tagId) {
			return res.status(400).json({ error: 'invalid request.' });
		}

		const result = await TagService.delete(tagId);
		if (result.status) {
			return res.status(200).json({ message: 'success.' });
		} else {
			return res.status(400).json({ error: result.error });
		}
	}
}

export default TagController;
