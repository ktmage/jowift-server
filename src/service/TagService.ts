import { PrismaClient } from '@prisma/client';
import { Result } from '../types';

const prisma = new PrismaClient

class TagService {
    
    // タグの作成
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
           await prisma.$disconnect();
        }
    }

    // タグの名前を変更する。
    static async Rename(name: string, tagId: number) : Promise<Result<void>> {
        try{
            await prisma.tag.update({
                where:{
                    id: tagId,
                },
                data:{
                    name: name
                }
            })

            return { status: true } 
        } catch(error){
            console.log(error);
            return {status: false, error: 'server error.'}
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default TagService;