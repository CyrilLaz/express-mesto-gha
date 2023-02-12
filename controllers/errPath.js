const NoExistError = require('../errors/NoExistError');

module.exports = (req, res, next) => {
  next(new NoExistError(`Такого пути: ${req.baseUrl} не существует`));
};
