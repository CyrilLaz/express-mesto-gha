class NoRightError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoRightError';
    this.statusCode = 403;
  }
}

module.exports = NoRightError;
