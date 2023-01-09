const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const {
  loginValidate, createUserValidate, changeUserDataValidate, createCardValidate, tokenValidate,
} = require('./middlewares/validate');
const auth = require('./middlewares/auth');
const routerUsers = require('./routers/users');
const routerCards = require('./routers/cards');
const routerMe = require('./routers/me');
const routerErrPath = require('./routers/errPath');
const { handlerErrors } = require('./middlewares/errors');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', loginValidate, login);
app.post('/signup', createUserValidate, createUser);

app.use('/users/me', tokenValidate, auth, changeUserDataValidate, routerMe); // роутер данных юзера

app.use('/users', tokenValidate, auth, routerUsers); // роутер юзеров

app.use('/cards', tokenValidate, auth, createCardValidate, routerCards); // роутер карточек

app.use('*', routerErrPath); // роутер для обработки неправильного пути

app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
