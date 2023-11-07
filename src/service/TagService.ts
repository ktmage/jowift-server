import { PrismaClient } from '@prisma/client';
import { DisplayTag, Result } from '../types';

// TODO:📝以下のように、prismaClientのエラーを拾ってエラー処理を書く。NoteとかAuthも。
/*
			await prisma.tag.delete({
				where: {
					id: tagId,
				},
			}).catch((error) => {
                // ormのエラーを処理してなかった。書かないと。
                console.log(error.code);
                console.log(error.meta.cause);
            });
*/

const prisma = new PrismaClient();

class TagService {
	static async create(name: string, userId: number): Promise<Result<string>> {
		try {
			// タグを作成。
			const createdTag = await prisma.tag.create({
				data: {
					name: name,
					author: {
						connect: { id: userId },
					},
				},
			});

			return { status: true, data: createdTag.id };
		} catch (error) {
			console.log(error);
			return { status: false, error: 'server error.' };
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getAll(userId: number): Promise<Result<DisplayTag[]>> {
		try {
			const tags = await prisma.tag.findMany({
				where: {
					authorId: userId,
				},
				select: {
					id: true,
					name: true,
					createdAt: true,
					updatedAt: true,
				},
			});

			if (!tags) {
				return { status: false, error: 'tag not found.' };
			}

			return { status: true, data: tags };
		} catch (error) {
			console.log(error);
			return { status: false, error: 'server error.' };
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getById(tagId: string): Promise<Result<DisplayTag>> {
		try {
			const tag = await prisma.tag.findUnique({
				where: {
					id: tagId,
				},
				select: {
					id: true,
					name: true,
					createdAt: true,
					updatedAt: true,
				},
			});

			if (!tag) {
				return { status: false, error: 'tag not found.' };
			}

			return { status: true, data: tag };
		} catch (error) {
			console.log(error);
			return { status: false, error: 'server error.' };
		} finally {
			await prisma.$disconnect();
		}
	}

	static async rename(name: string, tagId: string): Promise<Result<void>> {
		try {
			await prisma.tag.update({
				where: {
					id: tagId,
				},
				data: {
					name: name,
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

	static async delete(tagId: string): Promise<Result<void>> {
		try {
			await prisma.tag.delete({
				where: {
					id: tagId,
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

export default TagService;
