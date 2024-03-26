const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {
        type: Date,
        default: Date.now
    }
});

Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;  // Export the Notes model