const express = require('express');

const router = express.Router();

const Notes = require('../models/notesModel');

const addNotesHandler = require('../controllers/addNotes');

const deleteHandler = require('../controllers/deleteNotes');

router.get('/', async (req, res) => {
    try {
        const notes = await Notes.find();
        res.send(notes);
    } catch (err) {
        console.log(err)
        res.status(400).send({error  : 'Error getting notes'});
    }
});

router.post('/addNotes', addNotesHandler);  // Add a new note

router.delete('/deleteNotes/:id', deleteHandler); // Delete a note

module.exports = router;  // Export the router