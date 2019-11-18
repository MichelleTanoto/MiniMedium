import middleware from './utils/middleware'; // another way to import other file functions

const config = require('./utils/config') 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const postRouter = require('./router/routes'); // to use the express routes
// const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

console.log('connecting to', config.URI)

mongoose.connect(config.URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use('/api',postRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT || 3000, () => {
    console.log(`Server is running on port: ${config.port}`);
});

module.exports = app