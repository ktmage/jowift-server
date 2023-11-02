import { Request, Response } from "express";
import TagService from '../service/TagService'

class TagController {
    static async Create(req: Request, res:Response){
        const { name } = req.body
        if (!name) {
            return res.status(400).json({error: 'invalid request.'});
        }        
        
        const userId = req.session.userId
        if (!userId) {
            return res.status(400).json({error: 'invalid session.'});
        }

        const result = await TagService.Create(name, userId)
        if (result.status){
            return res.status(200).json({ message: 'success.' });
        } else {
            return res.status(400).json({error: result.error});
        }
    }

    
}

export default TagController;