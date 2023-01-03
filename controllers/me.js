const User = require('../models/user');
const NoExistError = require('../utils/NoExistError');
const {
  defaultErrorStatus,
  dataErrorStatus,
  notFoundStatus,
} = require('../constants/errorStatuses');

function handleError(err, req, res) {
  if (err.name === 'CastError') {
    return res
      .status(dataErrorStatus)
      .send({ message: `Передан некорректный _id: ${req.user._id}` });
  }

  if (err instanceof NoExistError) {
    return res
      .status(notFoundStatus)
      .send({
        message: err.message,
      });
  }

  if (err.name === 'ValidationError') {
    return res.status(dataErrorStatus).send({
      message: 'Переданы некорректные данные.',
    });
  }
  return res
    .status(defaultErrorStatus)
    .send({ message: `Что-то пошло не так: ${err.name}` });
}

const changeUserData = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return Promise.reject(new NoExistError(`Пользователь с указанным _id: ${req.user._id} не найден.`));
    })
    .catch((err) => handleError(err, req, res)); // Обработка ошибки
};

const changeUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return Promise.reject(new NoExistError(`Пользователь с указанным _id: ${req.user._id} не найден.`));
    })
    .catch((err) => handleError(err, req, res)); // Обработка ошибки
};

module.exports = { changeUserData, changeUserAvatar };
