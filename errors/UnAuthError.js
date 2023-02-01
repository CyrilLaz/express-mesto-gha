class UnAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnAuthError';
    this.statusCode = 401;
  }
}

module.exports = UnAuthError;
