import { PrismaClient } from '@prisma/client';
import { DisplayTag } from '../types';

const prisma = new PrismaClient();

export class TagModel {
	static async create(name: string, userId: string): Promise<string> {
		try {
			const createdTag = await prisma.tag.create({
				data: {
					name: name,
					author: {
						connect: { id: userId },
					},
				},
			});

			return createdTag.id;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getAll(userId: string): Promise<DisplayTag[]> {
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

			return tags;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getById(tagId: string): Promise<DisplayTag> {
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
				throw new Error('tag not found.');
			}

			return tag;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async update(tagId: string, name: string): Promise<void> {
		try {
			await prisma.tag.update({
				where: { id: tagId },
				data: { name: name },
			});

			return;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async delete(tagId: string): Promise<void> {
		try {
			await prisma.tag.delete({
				where: {
					id: tagId,
				},
			});

			return;
		} finally {
			await prisma.$disconnect();
		}
	}
}
