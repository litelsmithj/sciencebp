const express = require('express');
const errorHandler = require('./middleware/errorMiddleware');
const dotenv = require('dotenv');
const port = process.env.port || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/protocols', require('./routes/protocolRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));