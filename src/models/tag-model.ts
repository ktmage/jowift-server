import { PrismaClient, Tag } from '@prisma/client';

const prisma = new PrismaClient();

class TagModel {
	static async create(name: string, userId: string): Promise<Tag> {
		try {
			const createdTag = await prisma.tag.create({
				data: {
					name: name,
					author: {
						connect: { id: userId },
					},
				},
			});

			return createdTag;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getAll(userId: string): Promise<Tag[]> {
		try {
			const tags = await prisma.tag.findMany({
				where: {
					authorId: userId,
				},
			});

			return tags;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getById(tagId: string): Promise<Tag> {
		try {
			const tag = await prisma.tag.findUnique({
				where: {
					id: tagId,
				},
			});

			if (!tag) {
				throw new Error('tag not found.');
			}

			return tag;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async update(tagId: string, name: string): Promise<Tag> {
		try {
			const updatedTag = await prisma.tag.update({
				where: { id: tagId },
				data: { name: name },
			});

			return updatedTag;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async delete(tagId: string): Promise<Tag> {
		try {
			const deletedTag = await prisma.tag.delete({
				where: {
					id: tagId,
				},
			});

			return deletedTag;
		} finally {
			await prisma.$disconnect();
		}
	}
}

export default TagModel;
