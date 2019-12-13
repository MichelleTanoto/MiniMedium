require('dotenv').config({path:'./.env'}) // why
const config = require('./utils/config')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const postRouter = require('./routes/posts'); // to use the express routes
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login')
const middleware = require('./utils/middleware');
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
app.use(middleware.tokenExtractor);
app.use('/posts',postRouter);
app.use('/users',userRouter);
app.use('/login',loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT || 3001, () => {
    console.log(`Server is running on port: ${config.PORT}`);
});

module.exports = app