const jwt = require('jsonwebtoken');
const { unAuthStatus } = require('../constants/errorStatuses');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { cookies } = req;

  if (!cookies || !cookies.jwt) {
    return res
      .status(unAuthStatus)
      .send({ message: 'Необходима авторизация' });
  }

  const { jwt: token } = cookies;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key'); // секретный код
  } catch (error) {
    return res
      .status(unAuthStatus)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;

  return next();
};
