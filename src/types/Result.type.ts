interface Result<T> {
	status: boolean;
	error?: string;
	message?: string;
	data?: T;
}

export default Result;
