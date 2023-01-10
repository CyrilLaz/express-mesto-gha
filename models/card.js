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
    link: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          // eslint-disable-next-line no-useless-escape
          const regex = /^https?:\/\/([\w\-]+\.)+[a-z]{2,}(\/[\w#\-\.~:\[\]@!\$&'\(\)\*\+,;=,]*)*$/i;
          return regex.test(v);
        },
      },
    },
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
