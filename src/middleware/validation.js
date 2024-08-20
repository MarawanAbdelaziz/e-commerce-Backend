import asyncHandler from "./asyncHandler.js";

let dataMethod = ["body", "params", "query", "headers", "file", "files"];

const validation = (schema) => {
  return asyncHandler(async (req, res, next) => {
    let arrErrors = [];
    dataMethod.forEach((key) => {
      if (schema[key]) {
        const { error } = schema[key].validate(req[key], { abortEarly: false });
        if (error) {
          arrErrors.push(...error.details);
        }
      }
    });

    if (arrErrors.length) {
      return res.json({ message: "validation error", error: arrErrors });
    }

    next();
  });
};

export default validation;
