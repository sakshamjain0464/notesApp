const Notes = require('../models/notesModel');

const updateHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedNote = await Notes.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!updatedNote) {
            return res.status(404).send({ error: 'Note not found' });
        }

        res.send(updatedNote);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'Error updating note' });
    }
}

module.exports = updateHandler;