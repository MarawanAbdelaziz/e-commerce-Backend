const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      error.cause = 500;
      next(error);
    });
  };
};

export default asyncHandler;
