const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./routes/api');
const web = require('./routes/web');

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use('/api/v1', api);
app.use('/', web);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the netlify api',
}));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
