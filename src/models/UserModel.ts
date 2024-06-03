import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserModel {
	// サインアップができたらユーザーIDを返す。
	static async create(username: string, email: string, password: string): Promise<User> {
		try {
			const user = await prisma.user.create({
				data: {
					name: username,
					email: email,
					hashedPassword: password,
				},
			});
			return user;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getById(userId: string): Promise<User | null> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			});

			return user;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getByEmail(email: string): Promise<User | null> {
		try {
			const user = await prisma.user.findUnique({
				where: { email: email },
			});

			return user;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async update(userId: string, username: string, email: string): Promise<User> {
		try {
			const user = await prisma.user.update({
				where: { id: userId },
				data: {
					name: username,
					email: email,
				},
			});
			return user;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async delete(userId: string): Promise<void> {
		try {
			await prisma.user.delete({
				where: { id: userId },
			});
		} finally {
			await prisma.$disconnect();
		}
	}
}
