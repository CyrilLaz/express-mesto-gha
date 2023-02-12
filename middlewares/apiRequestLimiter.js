const rateLimit = require('express-rate-limit');
const TooManyRequestError = require('../errors/TooManyRequestError');

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  handler: (req, res, next) => next(
    new TooManyRequestError('Слишком много запросов от тебя, полегче будь'),
  ),
});
