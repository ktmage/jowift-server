import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@/service';
import { RequestError } from '@/utility';
import { UserModel } from '@/models';

class AuthController {
	static async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password) {
				throw new RequestError('invalid request.');
			}
			const createdUser = await AuthService.signUp(name, email, password);
			req.session.userId = createdUser.id;
			res.status(200).send({
				name: createdUser.name,
				email: createdUser.email,
				photoUrl: createdUser.photoUrl,
				authMethod: createdUser.authMethod,
				createdAt: createdUser.createdAt,
				updatedAt: createdUser.updatedAt,
			});
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
			const user = await AuthService.login(email, password);
			req.session.userId = user.id;
			res.status(200).send({
				name: user.name,
				email: user.email,
				photoUrl: user.photoUrl,
				authMethod: user.authMethod,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
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

			if (!user) {
				throw new RequestError('user not found.');
			}

			return res.status(200).json({
				name: user.name,
				email: user.email,
				photoUrl: user.photoUrl,
				authMethod: user.authMethod,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
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

			const user = await UserModel.delete(userId);

			return res.status(200).json({
				id: user.id,
			});
		} catch (e) {
			next(e);
		}
	}
}

export default AuthController;
