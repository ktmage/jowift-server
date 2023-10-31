import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { Result } from '../types';

const prisma = new PrismaClient();

// ノートの全般の処理を行うクラス
class NoteService {
	static async Post(
		note: Prisma.NoteCreateInput,
		userId: number,
		tagId: number[],
	): Promise<Result<number>> {
		// トランザクション処理
		return await prisma.$transaction(async (transaction): Promise<Result<number>> => {
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
                tagId.map(async (tagId: number) => {
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
        });
	}

    
}

export default NoteService;
