const { celebrate, Joi } = require('celebrate');

module.exports.loginValidate = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
  },
);

module.exports.createUserValidate = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().min(2).max(30),
      password: Joi.string().required().min(2),
      // eslint-disable-next-line no-useless-escape
      avatar: Joi.string().min(5).pattern(/^https?:\/\/([\w\-]+\.)+[a-z]{2,}(\/[\w#\-\.~:\[\]@!\$&'\(\)\*\+,;=,]*)*$/i),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  },
);

module.exports.changeUserDataValidate = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      // eslint-disable-next-line no-useless-escape
      avatar: Joi.string().min(2).pattern(/^https?:\/\/([\w\-]+\.)+[a-z]{2,}(\/[\w#\-\.~:\[\]@!\$&'\(\)\*\+,;=,]*)*$/i),
    }).or('name', 'about', 'avatar'),
  },
);

module.exports.createCardValidate = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      // eslint-disable-next-line no-useless-escape
      link: Joi.string().required().min(2).pattern(/^https?:\/\/([\w\-]+\.)+[a-z]{2,}(\/[\w#\-\.~:\[\]@!\$&'\(\)\*\+,;=,]*)*$/i),
    }),
  },
);

module.exports.tokenValidate = celebrate(
  {
    cookies: Joi.object().keys({
      // eslint-disable-next-line no-useless-escape
      jwt: Joi.string().pattern(/^[\w\._\-]{10,}$/),
    }),
  },
);

module.exports.idValidate = celebrate(
  {
    params: Joi.object().keys({
      // eslint-disable-next-line no-useless-escape
      userId: Joi.string().pattern(/^[a-z0-9]{24}$/),
      cardId: Joi.string().pattern(/^[a-z0-9]{24}$/),
    }).or('cardId', 'userId'),
  },
);
