import { NextFunction, Request, Response } from 'express';
import AuthService from '../service/AuthService';
import RequestError from '../utility/RequestError';
import { UserModel } from '../models';

class AuthController {
	static async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password) {
				throw new RequestError('invalid request.');
			}
			const user = await AuthService.signUp(name, email, password);
			req.session.userId = user.id;
			res.status(200).send({ message: 'success.' });
		} catch (e) {
			next(e);
		}
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				throw new RequestError('invalid request.');
			}
			const result = await AuthService.login(email, password);
			req.session.userId = result.id;
			res.status(200).send({ message: 'success.' });
		} catch (e) {
			next(e);
		}
	}

	static async session(req: Request, res: Response) {
		if (req.session.userId || req.user) {
			res.status(200).send({ message: 'success.' });
		} else {
			res.status(401).send({ message: 'no active session.' });
		}
	}

	static async logout(req: Request, res: Response) {
		req.session.destroy((err) => {
			if (err) {
				res.status(400).send({ message: 'failed.' });
			} else {
				res.status(200).send({ message: 'success.' });
			}
		});
	}

	static async getUser(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.session.userId ?? req.user?.id;

			if (!userId) {
				throw new RequestError('no active session.');
			}

			const user = await UserModel.getById(userId);

			return res.status(200).json({ data: user });
		} catch (e) {
			next(e);
		}
	}

	static async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.session.userId ?? req.user?.id;

			if (!userId) {
				throw new RequestError('no active session.');
			}

			await UserModel.delete(userId);
		} catch (e) {
			next(e);
		}
	}
}

export default AuthController;
