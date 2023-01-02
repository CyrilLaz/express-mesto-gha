const { notFoundStatus } = require('../constants/errorStatuses');

module.exports = (req, res) => {
  res.status(notFoundStatus).send({ message: `Такой пути: ${req.baseUrl} не существует` });
};
