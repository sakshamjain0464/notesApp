const express = require('express');
const connect = require('./connect');
const Notes = require('./models/notesModel');
const notesRouter = require('./routes/notesRouter');
const app = express();
connect();    // Connect to MongoDB

app.use(express.json());

app.get('/', (req, res) => res.sendFile('./views/index.html'))
app.use('/notes',notesRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});