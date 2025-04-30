const Datastore = require('nedb-promises');
const uuid = require('uuid-random');
const path = require('path');

// Initialize the database
const notesDB = Datastore.create({
  filename: path.join(__dirname, '../database/notesDataBase.db'),
  autoload: true,
});

// Log database connection
console.log('Notes database connected at:', path.join(__dirname, '../database/notesDataBase.db'));

// Fetch all notes
async function getNotes() {
  return await notesDB.find({});
}

// Add a new note
async function addNote(note) {
  const noteObj = {
    id: uuid(),
    title: note.title,
    text: note.text,
    createdAt: new Date().toDateString(),
    modifiedAt: new Date().toDateString(),
  };
  return await notesDB.insert(noteObj);
}

// Remove a note by ID
async function removeNote(id) {
  const result = await notesDB.remove({ id });

  if (result > 0) {
    return {
      success: true,
      notes: await getNotes(),
    };
  } else {
    return {
      success: false,
      message: 'No note found with that id [FROM REMOVE NOTE FUNCTION]',
    };
  }
}

// Update a note by ID
async function updateNote(id, updatedNote) {
  const existingNote = await notesDB.findOne({ id });

  if (!existingNote) {
    return {
      success: false,
      message: 'No note found with that id[FROM UPDATE NOTE FUNCTION]',
    };
  }

  const updatedNoteObj = {
    id,
    title: updatedNote.title || existingNote.title,
    text: updatedNote.text || existingNote.text,
    createdAt: existingNote.createdAt,
    modifiedAt: new Date(),
  };

  const result = await notesDB.update({ id }, updatedNoteObj);

  if (result > 0) {
    return {
      success: true,
      notes: await getNotes(),
    };
  } else {
    return {
      success: false,
      message: 'Note update failed',
    };
  }
}

// Find a note by title
async function findNoteByTitle(title) {
  const note = await notesDB.findOne({ title });

  if (!note) {
    return {
      success: false,
      message: 'No note found with that title',
    };
  } else {
    return {
      success: true,
      note,
    };
  }
}

module.exports = { getNotes, addNote, removeNote, updateNote, findNoteByTitle };