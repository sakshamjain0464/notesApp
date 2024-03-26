const Notes = require('../models/notesModel');

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    if(!id) return res.status(400).send({error : 'ID is required'});
    try {
        const note = await Notes.findByIdAndDelete(id);
        if(!note) return res.status(404).send({error : 'Note not found'});
        res.send(note);
    } catch (err) {
        console.log(err);
        res.status(400).send({error : 'Error deleting note'});
    }
}

module.exports = deleteHandler;  // Export the deleteHandler function