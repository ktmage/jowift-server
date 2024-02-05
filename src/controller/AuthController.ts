import { Request, Response } from 'express';
import AuthService from '../service/AuthService';

// 認証用コントローラー
class AuthController {
	static async SignUp(req: Request, res: Response) {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			res.status(400).send({ message: 'invalid request.' });
			return;
		}

		const result = await AuthService.SignUp(name, email, password);
		if (result.status) {
			req.session.userId = result.data;
			res.status(200).send({ message: 'success.' });
		} else {
			res.status(400).send({ message: result.error });
		}
	}

	static async Login(req: Request, res: Response) {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).send({ message: 'invalid request.' });
			return;
		}

		const result = await AuthService.Login(email, password);
		if (result.status) {
			req.session.userId = result.data;
			res.status(200).send({ message: 'success.' });
		} else {
			res.status(400).send({ message: result.error });
		}
	}

	static async Session(req: Request, res: Response) {
		if (req.session.userId || req.user) {
			res.status(200).send({ message: 'success.' });
		} else {
			res.status(401).send({ message: 'no active session.' });
		}
	}

	static async Logout(req: Request, res: Response) {
		req.session.destroy((err) => {
			if (err) {
				res.status(400).send({ message: 'failed.' });
			} else {
				res.status(200).send({ message: 'success.' });
			}
		});
	}

	static async getUser(req: Request, res: Response) {
		const userId = req.session.userId ?? req.user?.id;

		if (!userId) {
			res.status(401).send({ message: 'no active session.' });
			return;
		}

		const result = await AuthService.getUser(userId);
		if (result.status) {
			res.status(200).send({ message: 'success.', data: result.data });
		} else {
			res.status(400).send({ message: result.error });
		}
	}

	static async deleteUser(req: Request, res: Response) {
		const userId = req.session.userId ?? req.user?.id;

		if (!userId) {
			res.status(401).send({ message: 'no active session.' });
			return;
		}

		const result = await AuthService.deleteUser(userId);
		if (result.status) {
			res.status(200).send({ message: 'success.' });
		} else {
			res.status(400).send({ message: result.error });
		}
	}
}

export default AuthController;
