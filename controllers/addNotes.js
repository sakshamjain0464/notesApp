const Notes = require('../models/notesModel');

const addNotesHandler = async (req, res) => {
    const {title, content} = req.body;
    if(!title || !content) return res.status(400).send({error : 'Title and content are required'});
    try {
        const note = new Notes(req.body);
        await note.save();
        res.status(201).send(note);
    } catch (err) {
        console.log(err);
        res.status(400).send({error : 'Error adding note'});
    }
}

module.exports = addNotesHandler;  // Export the addNotesHandler function