const mongoose = require('mongoose');
require('dotenv').config()

const URI = process.env.URI

const connect = () => { 
    mongoose.connect(URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
        process.exit();
    });
}

module.exports = connect;   // Export the connect function