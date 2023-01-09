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
      avatar: Joi.string().min(5),
      name: Joi.string().min(2),
      about: Joi.string().min(2),
    }),
  },
);

module.exports.changeUserDataValidate = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2),
      about: Joi.string().min(2),
      avatar: Joi.string().min(2),
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
      jwt: Joi.string().pattern(/^[\w\._]{10,}$/),
    }),
  },
);
