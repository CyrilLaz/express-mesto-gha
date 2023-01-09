const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NoExistError = require('../errors/NoExistError');
const NoEnoughError = require('../errors/NoEnoughError');

const findAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data))
    .catch(next); // Обработка ошибки
};

const findUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new NoExistError('Запрашиваемый пользователь не найден');
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    throw new NoEnoughError('Не хватает данных для идентификации');
  }
  User.init()
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch(next); // Обработка ошибки
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new NoEnoughError('Не хватает данных для аутентификации');
  }
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key', // секретный код
        { expiresIn: '7d' },
      );
      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).end();
    })
    .catch(next);
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  login,
};
