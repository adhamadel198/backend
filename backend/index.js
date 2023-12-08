const express = require('express');
 
const cors = require('cors');

const articlerouter = require('./routes/article');
const publishersRouter = require('./routes/publisher')
const draftsRouter = require('./routes/draft')



const app = express();

const port = process.env.PORT; 

app.use(cors());

app.use(express.json());

app.use('/article', articlerouter);
app.use('/publishers', publishersRouter); 
app.use('/drafts', draftsRouter);

app.listen(port, async() => {
    console.log(`Now listening on port ${port}`);
});