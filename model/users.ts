import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
const prisma = new PrismaClient();

class UserModel {
	static async get(id: number) {
		try {
			const result = await prisma.user.findUnique({ where: { id } });
			return result;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async create(data: Prisma.UserCreateInput) {
		// 本来はハッシュ化したりバリデーションを行うけど今回は省略。
        // name, email, passwordだけを受け取ってDBに保存するとか、
        // それらが正しいフォーマットかどうかをチェックするとか、
        // そういう処理を想定している。

		try {
			const result = await prisma.user.create({ data });
			return result;
		} finally {
			await prisma.$disconnect();
		}
	}
}

export default UserModel;
