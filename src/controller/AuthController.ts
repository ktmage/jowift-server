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
}

export default AuthController;
