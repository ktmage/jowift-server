import { Note, PrismaClient, Tag } from '@prisma/client';

const prisma = new PrismaClient();

type FullNote = Note & { tags: Tag[] };

class NoteModel {
	static async create(
		title: string,
		content: string,
		userId: string,
		tagId: string[],
	): Promise<FullNote> {
		try {
			const createdNote = await prisma.note.create({
				data: {
					title,
					content,
					author: { connect: { id: userId } },
					tags: {
						connect: tagId.map((id) => ({ id })),
					},
				},
				include: {
					tags: true,
				},
			});
			return createdNote;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getAll(userId: string): Promise<FullNote[]> {
		try {
			const notes = await prisma.note.findMany({
				where: {
					authorId: userId,
				},
				include: {
					tags: true,
				},
			});

			return notes;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getById(noteId: string, userId: string): Promise<FullNote> {
		try {
			const note = await prisma.note.findUnique({
				where: {
					id: noteId,
					authorId: userId,
				},
				include: {
					tags: true,
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

	static async update(
		noteId: string,
		title: string,
		content: string,
		tagId: string[],
	): Promise<FullNote> {
		try {
			const updatedNote = await prisma.note.update({
				where: {
					id: noteId,
				},
				data: {
					title,
					content,
					tags: {
						set: tagId.map((id) => ({ id })),
					},
				},
				include: {
					tags: true,
				},
			});

			return updatedNote;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async delete(noteId: string): Promise<Note> {
		try {
			const deletedNote = await prisma.note.delete({
				where: {
					id: noteId,
				},
			});

			return deletedNote;
		} finally {
			await prisma.$disconnect();
		}
	}
}

export default NoteModel;
