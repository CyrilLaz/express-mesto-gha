const Card = require('../models/card');
const NoExistError = require('../errors/NoExistError');
const NoRightError = require('../errors/NoRightError');

const findAllCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
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

const putLike = (req, res, next) => {
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
    .catch(next); // Обработка ошибки;
};

const RemoveLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return Promise.reject(new NoExistError(`Передан несуществующий _id: ${req.params.cardId} карточки.`));
    })
    .catch(next); // Обработка ошибки;
};

module.exports = {
  findAllCards,
  createCard,
  removeCard,
  putLike,
  RemoveLike,
};
