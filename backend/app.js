const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/routes');
const сentralizedErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json()); // для сборки JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);
app.use(cors);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());
app.use(сentralizedErrors);

app.listen(PORT);
