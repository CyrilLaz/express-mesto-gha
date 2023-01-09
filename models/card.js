const mongoose = require('mongoose');
const NoExistError = require('../errors/NoExistError');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

cardSchema.statics.isOwnerCheck = function (idCard, idUser) {
  return this.findById(idCard).then((card) => {
    if (!card) {
      return Promise.reject(new NoExistError('Карточка не найдена'));
    }

    return String(card.owner) === idUser;
  });
};

module.exports = mongoose.model('card', cardSchema);
