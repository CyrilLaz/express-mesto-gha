const jwt = require('jsonwebtoken');
const { unAuthStatus } = require('../constants/errorStatuses');
// const cookieParser

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const cookies = req.headers.cookie;

  if (!cookies || !cookies.startsWith('jwt=')) {
    return res
      .status(unAuthStatus)
      .send({ message: 'Необходима авторизация' });// обработка ошибки
  }

  const token = cookies.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (error) {
    return res
      .status(unAuthStatus)
      .send({ message: 'Необходима авторизация' });// обработка ошибки
  }
  req.user = payload;

  return next();
};
