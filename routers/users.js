const router = require('express').Router();
const User = require('../models/user');
const NoExistError = require('../utils/NoExistError');

router.get('/', (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ name: err.name, message: 'Что-то пошло не так' })); // Обработка ошибки
});

router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return Promise.reject(new NoExistError());
    })
    .catch((err) => {
      if (err.name === 'CastError' || err instanceof NoExistError) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(500).send({ name: err.name, message: 'Что-то пошло не так' }); // Обработка ошибки
    });
});

router.post('/', (req, res) => {
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
      return res.status(500).send({ name: err.name, message: 'Что-то пошло не так' });
    }); // Обработка ошибки
});

module.exports = router;
