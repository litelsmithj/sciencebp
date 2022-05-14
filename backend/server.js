const express = require('express');
const dotenv = require('dotenv');
const port = process.env.port || 5000;

const app = express();

app.use('/api/protocols', require('./routes/protocolRoutes'));

app.listen(port, () => console.log(`Server is running on port ${port}`));