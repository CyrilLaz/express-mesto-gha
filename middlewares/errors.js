/* eslint-disable no-unused-vars */
const {
  defaultErrorStatus,
  dataErrorStatus,
  notFoundStatus,
  unUniqueStatus,
} = require('../constants/errorStatuses');

const NoExistError = require('../errors/NoExistError');
const NoRightError = require('../errors/NoRightError');
const NoEnoughError = require('../errors/NoEnoughError');
const UncorrectLoginError = require('../errors/UncorrectLoginError');

module.exports.errors = (err, req, res, next) => {
  const { statusCode = defaultErrorStatus, message } = err;

  if (err instanceof UncorrectLoginError) {
    return res.status(err.statusCode).send({ message });
  }
  if (err instanceof NoRightError) {
    return res.status(err.statusCode).send({ message });
  }
  if (err instanceof NoExistError) {
    return res.status(err.statusCode).send({ message });
  }
  if (err instanceof NoEnoughError) {
    return res.status(err.statusCode).send({ message });
  }
  if (err.code === 11000) {
    return res
      .status(unUniqueStatus)
      .send({ message: 'Пользователь с таким email уже зарегистрирован' });
  }
  if (err.name === 'CastError') {
    return res
      .status(dataErrorStatus)
      .send({ message: 'Передан некорректный _id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(dataErrorStatus).send({
      message: 'Переданы некорректные данные.',
    });
  }
  return res
    .status(statusCode)
    .send({ message: `Что-то пошло не так: ${err.name}` });
};
