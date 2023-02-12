class TooManyRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'tooManyRequestError';
    this.statusCode = 429;
  }
}

module.exports = TooManyRequestError;
