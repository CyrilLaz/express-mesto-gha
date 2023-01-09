class NoEnoughError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoEnoughError';
    this.statusCode = 418;
  }
}

module.exports = NoEnoughError;
