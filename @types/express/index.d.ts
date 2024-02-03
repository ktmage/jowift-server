// req.user が使えるようにする。
declare namespace Express {
	export interface Request {
		user: {
			id: string;
			name: string;
			email: string;
			photo: string;
		};
	}
}
