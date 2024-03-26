const express = require('express');
const connect = require('./connect');
const Notes = require('./models/notesModel');
const notesRouter = require('./routes/notesRouter');
const path = require('path')
const app = express();
// connect();    // Connect to MongoDB

// app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './views/index.html')))
// app.use('/notes',notesRouter);

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});