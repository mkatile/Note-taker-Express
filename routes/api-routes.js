const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const path = require("path");


router.get('/notes', async (req, res) => {
  try {
      const data = await fs.readFileSync(path.join('db', 'db.json'), 'utf8');
      const notes = JSON.parse(data);
      res.json(notes);
  } catch (err) {
      console.error('Error reading notes:', err);
      res.status(500).json({ error: 'Failed to read notes' });
  }
});

// POST  request
router.post('/notes', async (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // Generate a unique id for the new note

  try {
      const data = await fs.readFileSync(path.join('db', 'db.json'), 'utf8');
      const notes = JSON.parse(data);
      notes.push(newNote);

      await fs.writeFileSync(path.join('db', 'db.json'), JSON.stringify(notes, null, 2));
      console.log('New note saved:', newNote);
      res.json(newNote);
  } catch (err) {
      console.error('Error saving note:', err);
      res.status(500).json({ error: 'Failed to save note' });
  }
});

// DELETE request
router.delete('/notes/:id', async (req, res) => {
  const noteId = req.params.id;

  try {
      const data = await fs.readFileSync(path.join('db', 'db.json'), 'utf8');
      let notes = JSON.parse(data);
      notes = notes.filter(note => note.id !== noteId);

      await fs.writeFileSync(path.join('db', 'db.json'), JSON.stringify(notes, null, 2));
      res.json({ success: true });
  } catch (err) {
      console.error('Error deleting note:', err);
      res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;