class NoExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoExistError';
    this.statusCode = 404;
  }
}

module.exports = NoExistError;
