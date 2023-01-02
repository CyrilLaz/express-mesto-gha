const router = require('express').Router();
const User = require('../models/user');
const NoExistError = require('../utils/NoExistError');

router.patch('/', (req, res) => {
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
          .status(404)
          .send({ message: `Пользователь с указанным _id: ${req.user._id} не найден.` });
        return;
      }
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля.',
          });
        return;
      }
      res.status(500).send({ message: `Что-то пошло не так: ${err.name}` });
    }); // Обработка ошибки
});

router.patch('/avatar', (req, res) => {
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
          .status(404)
          .send({ message: `Пользователь с указанным _id: ${req.user._id} не найден.` });
        return;
      }
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при обновлении аватара.',
          });
        return;
      }
      res.status(500).send({ message: `Что-то пошло не так: ${err.name}` });
    }); // Обработка ошибки
});

module.exports = router;
