import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { DisplayNote, Result } from '../types';
import NoteListItem from '../types/NoteListItem.type';

const prisma = new PrismaClient();

// ノートの全般の処理を行うクラス
class NoteService {
	static async post(
		note: Prisma.NoteCreateInput,
		userId: number,
		tagId: string[],
	): Promise<Result<string>> {
		// トランザクション処理
		return await prisma
			.$transaction(async (transaction): Promise<Result<string>> => {
				// ノートを作成
				const createdNote = await transaction.note.create({
					data: {
						...note,
						author: { connect: { id: userId } },
					},
				});

				// 作成したノートのIDを取得
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

				return { status: true, data: noteId };
			})
			.catch((error) => {
				// TODO: 📝トランザクション中に発生したエラーのエラーハンドリングを書く。
				// ex: connect先のIDが存在しない場合など。
				// https://chat.openai.com/share/8e06ceb5-2675-4827-b1d0-44bb8919e3f2
				console.log(error);
				return { status: false, error: 'server error.' };
			})
			.finally(() => {
				prisma.$disconnect();
			});
	}

	static async getById(noteId: string, userId: number): Promise<Result<DisplayNote>> {
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
				return { status: false, error: 'note not found.' };
			}

			return { status: true, data: note };
		} catch (error) {
			console.log(error);
			return { status: false, error: 'server error.' };
		} finally {
			await prisma.$disconnect();
		}
	}

	static async getAll(userId: number): Promise<Result<NoteListItem[]>> {
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

			if (!note) {
				return { status: false, error: 'note not found.' };
			}

			return { status: true, data: note };
		} catch (error) {
			console.log(error);
			return { status: false, error: 'server error.' };
		} finally {
			await prisma.$disconnect();
		}
	}

	// TODO: 🔍トランザクション処理が回りくどい気がする。本当にこの書き方で良いのか要検討。
	static async update(
		noteId: string,
		updateData: { title: string; content: string },
		tagId: string[],
	): Promise<Result<void>> {
		return await prisma
			.$transaction(async (transaction): Promise<Result<void>> => {
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
					tagId.map((tagId: string, index) => {
						console.log(index);
						return transaction.noteTag.create({
							data: {
								note: { connect: { id: noteId } },
								tag: { connect: { id: tagId } },
							},
						});
					}),
				);

				return { status: true };
			})
			.catch((error) => {
				console.log(error);
				return { status: false, error: 'server error.' };
			})
			.finally(() => {
				prisma.$disconnect();
			});
	}

	static async delete(noteId: string): Promise<Result<void>> {
		try {
			await prisma.note.delete({
				where: {
					id: noteId,
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

export default NoteService;
