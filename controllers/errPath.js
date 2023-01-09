const { notFoundStatus } = require('../constants/errorStatuses');

module.exports = (req, res) => {
  res.status(notFoundStatus).send({ message: `Такого пути: ${req.baseUrl} не существует` });
};
