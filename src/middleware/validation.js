const validation = (schema) => {
  return async (req, res, next) => {
    try {
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
    } catch (error) {
      res.status(500).json({ message: "server error", error: error.message });
    }
  };
};

export default validation;


