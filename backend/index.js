const connectToMongo = require('./db');
const express = require('express');
const path = require('path');
const cors = require('cors');

connectToMongo();

const app = express()
const port = 5000

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.use(express.json())

// app.use('/api/resumes',express.static(path.join(__dirname, 'middleware', 'uploads')))
// Available routes
app.use('/api/user', require('./routes/user'))
app.use('/api/project', require('./routes/project'))
app.use('/api/task', require('./routes/task'))
app.use('/api/notification', require('./routes/notification'))

app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`)
})