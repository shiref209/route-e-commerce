const globalErrorHandler = (error, req, res, next) => {
  if (req.validationError) {
    return res
      .status(error.cause || 500)
      .json({ message: error.message, errors: req.validationError.details });
  }
  return res
    .status(error.cause || 500)
    .json({ message: error.message, stack: error.stack });
};

export default globalErrorHandler;
