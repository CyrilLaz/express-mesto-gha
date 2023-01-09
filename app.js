const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const routerUsers = require('./routers/users');
const routerCards = require('./routers/cards');
const routerMe = require('./routers/me');
const routerErrPath = require('./routers/errPath');
const { errors } = require('./middlewares/errors');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, routerUsers); // роутер юзеров

app.use('/users/me', auth, routerMe); // роутер данных юзера

app.use('/cards', auth, routerCards); // роутер карточек

app.use('*', routerErrPath); // роутер для обработки неправильного пути

app.use(errors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
