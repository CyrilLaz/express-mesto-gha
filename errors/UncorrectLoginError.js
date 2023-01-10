class UncorrectLoginError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UncorrectLoginError';
    this.statusCode = 401;
  }
}

module.exports = UncorrectLoginError;
