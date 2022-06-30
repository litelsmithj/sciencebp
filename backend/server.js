const express = require('express');
const errorHandler = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.port || 5001;
const path = require('path');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/protocols', require('./routes/protocolRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/trackers', require('./routes/trackerRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }
  
  app.use(errorHandler);
  
  app.listen(port, () => console.log(`Server started on port ${port}`));