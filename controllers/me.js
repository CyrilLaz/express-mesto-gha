const User = require('../models/user');
const NoExistError = require('../errors/NoExistError');

const getUserData = (req, res, next) => {
  User.findById(req.user)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const changeUserData = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return Promise.reject(
        new NoExistError(
          `Пользователь с указанным _id: ${req.user._id} не найден.`,
        ),
      );
    })
    .catch(next); // Обработка ошибки
};

module.exports = { changeUserData, getUserData };
