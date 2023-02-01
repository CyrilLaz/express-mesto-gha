const e = require('express');
const jwt = require('jsonwebtoken');
// const { unAuthStatus } = require('../constants/errorStatuses');
const jwtKey = require('../constants/jwtKey');
const UnAuthError = require('../errors/UnAuthError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { cookies } = req;
  let payload;

  try {
    if (!cookies || !cookies.jwt) throw e;

    const { jwt: token } = cookies;
    payload = jwt.verify(token, jwtKey); // секретный код
  } catch (error) {
    return next(new UnAuthError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};
