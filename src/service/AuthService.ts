import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Result } from '../types';

const prisma = new PrismaClient();

class AuthService {
	// サインアップができたらユーザーIDを返す。
	static async SignUp(
		username: string,
		email: string,
		password: string,
	): Promise<Result<number>> {
		try {
			// パスワードのハッシュ化
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await prisma.user.create({
				data: {
					name: username,
					email: email,
					hashedPassword: hashedPassword,
				},
			});
			return { status: true, data: user.id };
		} catch (error) {
			console.log(error);
			return { status: false, error: 'server error.' };
		} finally {
			await prisma.$disconnect();
		}
	}

	// ログインができたらユーザーIDを返す。
	static async Login(email: string, password: string): Promise<Result<number>> {
		console.log(email, password);
		try {
			const user = await prisma.user.findUnique({
				where: {
					email: email,
				},
			});

			// ユーザーが存在しない場合
			if (!user) {
				return { status: false, error: 'invalid username or password.' };
			}

			// パスワードが一致しない場合
			const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
			if (!isValidPassword) {
				return { status: false, error: 'invalid username or password.' };
			}

			return { status: true, data: user.id };
		} catch (error) {
			console.log(error);
			return { status: false, error: 'server error.' };
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getUser(userId: number): Promise<Result<{ username: string; email: string }>> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					name: true,
					email: true,
				},
			});

			if (!user) {
				return { status: false, error: 'user not found.' };
			}

			return { status: true, data: { username: user.name, email: user.email } };
		} catch (error) {
			console.log(error);
			return { status: false, error: 'server error.' };
		} finally {
			await prisma.$disconnect();
		}
	}

	static async deleteUser(userId: number): Promise<Result<void>> {
		try {
			await prisma.user.delete({
				where: {
					id: userId,
				},
			});
			return { status: true };
		} catch (error) {
			console.log(error);
			return { status: false, error: 'server error.' };
		} finally {
			await prisma.$disconnect();
		}
	}
}

export default AuthService;
