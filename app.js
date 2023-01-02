const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const routerUsers = require('./routers/users');
const routerCards = require('./routers/cards');
const routerMe = require('./routers/me');
const routerErrPath = require('./routers/errPath');

const { PORT = 3000 } = process.env;
const userId = '63ae9050bcb7b3fa78a7d78a';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: userId,
  };

  next();
});

app.use('/users', routerUsers); // роутер юзеров

app.use('/users/me', routerMe); // роутер данных юзера

app.use('/cards', routerCards); // роутер карточек
app.use('*', routerErrPath); // роутер для обработки неправильного пути

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
