import { PrismaClient } from '@prisma/client';
import { Result } from '../types';

const prisma = new PrismaClient

class TagService {
    

    static async Create(name: string, userId: number): Promise<Result<number>>{
        try {
            // タグを作成。
            const createdTag = await prisma.tag.create({
                data:{
                    name: name,
                    author:{
                        connect: {id: userId}
                    }
                }
            }) 

            return {status: true, data: createdTag.id}

        } catch(error) {
            console.log(error);
            return {status: false, error:'server error.' }        
    
        } finally {
            prisma.$disconnect();
        }
    }
}

export default TagService;