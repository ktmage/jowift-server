import { Request, Response } from 'express';
import UserModel from '../model/users';

class UserController {
    static async read(req: Request, res: Response) 
    {
        const { id } = req.body;
        try {
            const result = await UserModel.get(id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).send({ error });
        }
    }

	static async create(req: Request, res: Response) {
		try {
            const result = await UserModel.create(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).send({ error });
        }
	}
}

export default UserController;
