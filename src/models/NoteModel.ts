import { Prisma, PrismaClient } from '@prisma/client';
import { DisplayNote } from '../types';
import NoteListItem from '../types/NoteListItem.type';

const prisma = new PrismaClient();

class NoteModel {
	// TODO: noteIdが返ってくるのは不自然か。
	static async create(
		note: Prisma.NoteCreateInput,
		userId: string,
		tagId: string[],
	): Promise<string> {
		return await prisma
			.$transaction(async (transaction): Promise<string> => {
				// ノートを作成
				const createdNote = await transaction.note.create({
					data: {
						...note,
						author: { connect: { id: userId } },
					},
				});

				const noteId = createdNote.id;

				// ノートとタグを紐づける
				await Promise.all(
					tagId.map(async (tagId: string) => {
						await transaction.noteTag.create({
							data: {
								note: { connect: { id: noteId } },
								tag: { connect: { id: tagId } },
							},
						});
					}),
				);

				return noteId;
			})
			.finally(() => {
				prisma.$disconnect();
			});
	}

	static async getById(noteId: string, userId: string): Promise<DisplayNote> {
		try {
			const note = await prisma.note.findUnique({
				where: {
					id: noteId,
					authorId: userId,
				},
				select: {
					id: true,
					title: true,
					content: true,
					createdAt: true,
					updatedAt: true,
					author: {
						select: {
							name: true,
						},
					},
					tags: {
						select: {
							tag: {
								select: {
									id: true,
									name: true,
								},
							},
						},
					},
				},
			});

			if (!note) {
				throw new Error('note not found.');
			}

			return note;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getAll(userId: string): Promise<NoteListItem[]> {
		try {
			const note = await prisma.note.findMany({
				where: {
					authorId: userId,
				},
				select: {
					id: true,
					title: true,
					content: false,
					createdAt: true,
					updatedAt: true,
					author: {
						select: {
							name: true,
						},
					},
					tags: {
						select: {
							tag: {
								select: {
									id: true,
									name: true,
								},
							},
						},
					},
				},
			});

			return note;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async update(
		noteId: string,
		updateData: { title: string; content: string },
		tagId: string[],
	): Promise<void> {
		return await prisma
			.$transaction(async (transaction): Promise<void> => {
				await transaction.note.update({
					where: {
						id: noteId,
					},
					data: {
						...updateData,
					},
				});

				await transaction.noteTag.deleteMany({
					where: {
						noteId: noteId,
					},
				});

				await Promise.all(
					tagId.map((tagId: string) => {
						return transaction.noteTag.create({
							data: {
								note: { connect: { id: noteId } },
								tag: { connect: { id: tagId } },
							},
						});
					}),
				);

				return;
			})
			.finally(() => {
				prisma.$disconnect();
			});
	}

	static async delete(noteId: string): Promise<void> {
		try {
			await prisma.note.delete({
				where: {
					id: noteId,
				},
			});

			return;
		} finally {
			await prisma.$disconnect();
		}
	}
}

export default NoteModel;
