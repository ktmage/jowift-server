import { Request, Response, NextFunction } from 'express';

// 認証されているかどうかを判定するミドルウェア
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	// 認証されている場合は次の処理へ
	if (req.session.userId) {
		next();
	}

	// 認証されていない場合はエラーを返す
	else {
		res.status(401).json({ message: 'Unauthorized' });
	}
};

export default isAuthenticated;
