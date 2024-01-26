export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    if (req.file) {
      data.file = req.file;
    }
    if (req.files) {
      data.files = req.files;
    }
    const validationResults = schema.validate(data, { abortEarly: false });
    if (validationResults.error) {
      req.validationError = validationResults.error;
      return next(new Error("validation error", { cause: 400 }));
    }
    return next();
  };
};
