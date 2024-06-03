// error-utils.ts
import { Prisma } from '@prisma/client';
import { RequestError, ServiceError } from '.';
import { Request, Response, NextFunction } from 'express';

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		res.status(400).send({ message: 'request error' });
	} else if (err instanceof RequestError) {
		res.status(400).send({ message: err.message });
	} else if (err instanceof ServiceError) {
		res.status(500).send({ message: err.message });
	} else {
		res.status(500).send({ message: 'server error' });
	}
	next();
};

export default handleError;
