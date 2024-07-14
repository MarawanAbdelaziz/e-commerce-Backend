const validation = (schema) => {
  return async (req, res, next) => {
    const validationData = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validationData.error) {
      return res.status(400).json({
        message: "validation error",
        error: validationData.error.details,
      });
    }

    next();
  };
};

export default validation;
