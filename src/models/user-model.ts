import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

class UserModel {
	static async create(username: string, email: string, password: string): Promise<User> {
		try {
			const createdUser = await prisma.user.create({
				data: {
					name: username,
					email: email,
					hashedPassword: password,
				},
			});
			return createdUser;
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
			const updatedUser = await prisma.user.update({
				where: { id: userId },
				data: {
					name: username,
					email: email,
				},
			});
			return updatedUser;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async delete(userId: string): Promise<User> {
		try {
			const deletedUser = await prisma.user.delete({
				where: { id: userId },
			});

			return deletedUser;
		} finally {
			await prisma.$disconnect();
		}
	}
}

export default UserModel;
