const AppError = require('../utils/error');

module.exports = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      uuAppErrorMap: {
        errorCode: err.errorCode,
        message: err.message
      }
    });
  }

  res.status(500).json({
    uuAppErrorMap: { errorCode: 'InternalServerError', message: 'An unexpected error occurred.' }
  });
};
