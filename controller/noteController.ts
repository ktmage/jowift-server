import { Request, Response } from 'express';
import NoteModel from '../model/notes';

class NoteController {
    static async read(req: Request, res: Response) 
    {
        const { id } = req.body;
        try {
            const result = await NoteModel.get(id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).send({ error });
        }
    }

	static async create(req: Request, res: Response) {
        const { title, content, userId } = req.body;
		try {
            const result = await NoteModel.create({title, content}, userId);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).send({ error });
        }
	}
}

export default NoteController;
