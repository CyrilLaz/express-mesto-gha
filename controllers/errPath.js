module.exports = (req, res) => {
  res.status(404).send({ message: `Такой пути: ${req.baseUrl} не существует` });
};
