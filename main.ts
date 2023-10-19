import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app: express.Express = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Start on port ${PORT}.`);
});

app.get('/', (req: express.Request, res: express.Response) => {
	res.send("Hello World");
});
