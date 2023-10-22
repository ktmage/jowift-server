import express from 'express';
import pool from '../database/pool';
const router = express.Router();

router.get("/notes", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const query =
    "SELECT notes.id, notes.title, notes.body, GROUP_CONCAT(tags.name SEPARATOR ',') AS tags FROM notes JOIN note_tag ON notes.id = note_tag.note_id JOIN tags ON tags.id = note_tag.tag_id GROUP BY notes.id";

    const rows = await connection.query(query);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
  } finally {
    connection.release();
  }
});

router.post("/notes", async (req, res) => {
  console.log(req.body);
  res.status(200).json("OK");
});

export default router;
