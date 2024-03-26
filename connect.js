const mongoose = require('mongoose');

const connect = () => { 
    mongoose.connect('mongodb://127.0.0.1:27017/notesApp')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
        process.exit();
    });
}

module.exports = connect;   // Export the connect function