const User = require('../models/user');
const NoExistError = require('../utils/NoExistError');
const { defaultErrorStatus, dataErrorStatus, notFoundStatus } = require('../constants/errorStatuses');

const changeUserData = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return Promise.reject(new NoExistError());
    })
    .catch((err) => {
      if (err.name === 'CastError' || err instanceof NoExistError) {
        res
          .status(notFoundStatus)
          .send({ message: `Пользователь с указанным _id: ${req.user._id} не найден.` });
        return;
      }
      if (err.name === 'ValidationError') {
        res
          .status(dataErrorStatus)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля.',
          });
        return;
      }
      res.status(defaultErrorStatus).send({ message: `Что-то пошло не так: ${err.name}` });
    }); // Обработка ошибки
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
      return Promise.reject(new NoExistError());
    })
    .catch((err) => {
      if (err.name === 'CastError' || err instanceof NoExistError) {
        res
          .status(notFoundStatus)
          .send({ message: `Пользователь с указанным _id: ${req.user._id} не найден.` });
        return;
      }
      if (err.name === 'ValidationError') {
        res
          .status(dataErrorStatus)
          .send({
            message: 'Переданы некорректные данные при обновлении аватара.',
          });
        return;
      }
      res.status(defaultErrorStatus).send({ message: `Что-то пошло не так: ${err.name}` });
    }); // Обработка ошибки
};

module.exports = { changeUserData, changeUserAvatar };
