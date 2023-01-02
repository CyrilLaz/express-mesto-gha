const User = require('../models/user');
const NoExistError = require('../utils/NoExistError');

const findAllUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: `Что-то пошло не так: ${err.name}` })); // Обработка ошибки
};

const findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return Promise.reject(new NoExistError());
    })
    .catch((err) => {
      if (err instanceof NoExistError) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      }
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: `Передан некорректный _id: ${req.params.userId}` });
      }
      return res.status(500).send({ message: `Что-то пошло не так: ${err.name}` }); // Обработка ошибки
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при создании пользователя.',
          });
      }
      return res.status(500).send({ message: `Что-то пошло не так: ${err.name}` });
    }); // Обработка ошибки
};

module.exports = { findAllUsers, findUserById, createUser };
