import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
const prisma = new PrismaClient();

class NoteModel {
	static async get(id: number) {
		try {
			const result = await prisma.note.findUnique({ where: { id } });
			return result;
		} finally {
			await prisma.$disconnect();
		}
	}

	static async create(data: Prisma.NoteCreateInput, userId: number) {
        const { title, content } = data;
        
		try {
			const result = await prisma.note.create({data:{
                title,
                content,
                author: {
                    connect: { id: userId }
                }
            }});
			return result;
		} finally {
			await prisma.$disconnect();
		}
	}
}

export default NoteModel;
