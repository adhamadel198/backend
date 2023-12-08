const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const initialdbconnection = require('./config/db');

const articlerouter = require('./routes/article');
const publishersRouter = require('./routes/publisher')
const draftsRouter = require('./routes/draft')

dotenv.config({
    path: './config/.env'
});

const app = express();

const port = process.env.PORT; 

app.use(cors());

app.use(express.json());

app.use('/article', articlerouter);
app.use('/publishers', publishersRouter); 
app.use('/drafts', draftsRouter);

app.listen(port, async() => {
    console.log(`Now listening on port ${port}`);
    await initialdbconnection();
});