import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UserModel } from '@/models';
import { RequestError } from '@/utility';

class AuthService {
	static async signUp(username: string, email: string, password: string): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10);
		const createdUser = UserModel.create(username, email, hashedPassword);
		return createdUser;
	}

	static async login(email: string, password: string): Promise<User> {
		const user = await UserModel.getByEmail(email);

		// ユーザーが存在しない場合
		if (!user) {
			throw new RequestError('invalid username or password.');
		}

		// パスワードが設定されていない場合
		if (user.hashedPassword === null) {
			throw new Error('invalid username or password.');
		}

		const isValidPassword = bcrypt.compare(password, user.hashedPassword);

		// パスワードが一致しない場合
		if (!isValidPassword) {
			throw new RequestError('invalid username or password.');
		}

		return user;
	}
}

export default AuthService;
