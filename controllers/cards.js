const Card = require('../models/card');
const NoExistError = require('../errors/NoExistError');
const NoRightError = require('../errors/NoRightError');
const {
  defaultErrorStatus,
  dataErrorStatus,
  notFoundStatus,
} = require('../constants/errorStatuses');

const findAllCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch(next); // Обработка ошибки
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(dataErrorStatus).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
        return;
      }
      res
        .status(defaultErrorStatus)
        .send({ message: `Что-то пошло не так: ${err.name}` });
    }); // Обработка ошибки
};

const removeCard = (req, res, next) => {
  // console.log(typeof req.user._id,'###', type);
  Card.isOwnerCheck(req.params.cardId, req.user._id)
    .then((owned) => {
      if (!owned) {
        return Promise.reject(new NoRightError('Удалить карточку может только владелец'));
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Карточка удалена' }));
    }).catch(next);
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return Promise.reject(new NoExistError(`Передан несуществующий _id: ${req.params.cardId} карточки.`));
    })
    .catch((err) => {
      if (err instanceof NoExistError) {
        return res
          .status(notFoundStatus)
          .send({
            message: `Передан несуществующий _id: ${req.params.cardId} карточки.`,
          });
      }
      if (err.name === 'CastError') {
        return res
          .status(dataErrorStatus)
          .send({
            message: 'Переданы некорректные данные для постановки лайка.',
          });
      }
      return res
        .status(defaultErrorStatus)
        .send({ message: `Что-то пошло не так: ${err.name}` });
    }); // Обработка ошибки;
};

const RemoveLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return Promise.reject(new NoExistError());
    })
    .catch((err) => {
      if (err instanceof NoExistError) {
        return res
          .status(notFoundStatus)
          .send({
            message: `Передан несуществующий _id: ${req.params.cardId} карточки.`,
          });
      }
      if (err.name === 'CastError') {
        return res
          .status(dataErrorStatus)
          .send({
            message: 'Переданы некорректные данные для удаления лайка.',
          });
      }
      return res
        .status(defaultErrorStatus)
        .send({ message: `Что-то пошло не так: ${err.name}` });
    }); // Обработка ошибки;
};

module.exports = {
  findAllCards,
  createCard,
  removeCard,
  putLike,
  RemoveLike,
};
