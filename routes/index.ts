import express from 'express';
const router = express.Router();
// const pool = require("../database/pool");

// GET: /notes
// Returns all notes in the database.
// router.get("/notes", async (req, res) => {
//   const connection = await pool.getConnection();
//   try {
//     const query =
//     "SELECT notes.id, notes.title, notes.body, GROUP_CONCAT(tags.name SEPARATOR ',') AS tags FROM notes JOIN note_tag ON notes.id = note_tag.note_id JOIN tags ON tags.id = note_tag.tag_id GROUP BY notes.id";

//     const rows = await connection.query(query);
//     res.header("Content-Type", "application/json; charset=utf-8");
//     res.status(200).json(rows[0]);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     connection.release();
//   }
// });

// router.post("/notes", async (req, res) => {
//   console.log(req.body);
//   res.status(200).json("OK");
//   // res.status(400).json("NO"); // ex: this is error response.
// });

// ルーティング
router.get('/hello', (req: express.Request, res: express.Response) => {
	res.send('Hello World');
});

router.get('/hello/:name', (req: express.Request, res: express.Response) => {
	res.send(`Hello ${req.params.name}`);
});

// さようなら
router.get('/goodbye', (req: express.Request, res: express.Response) => {
	res.send('Goodbye');
});

router.get('/goodbye/:name', (req: express.Request, res: express.Response) => {
	res.send(`Goodbye ${req.params.name}`);
});

export default router;
