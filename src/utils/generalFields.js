import joi from "joi";
import mongoose from "mongoose";

const objectIdValidation = (value , helper) => {
    return mongoose.Types.ObjectId.isValid(value) ? true : helper.message('invalid id')
};

const generalFields = {
  file: joi.object({
    size: joi
      .number()
      .max(1024 * 1024)
      .positive()
      .messages({
        "number.max": "Image size must be less than or equal to 1 MB",
      }),
    path: joi.string(),
    filename: joi.string(),
    destination: joi.string(),
    mimetype: joi.string(),
    encoding: joi.string(),
    originalname: joi.string(),
    fieldname: joi.string(),
  }),
  headers: joi.object({
    "Postman-Token": joi.string(),
    "Content-Type": joi.string(),
    "Content-Length": joi.string(),
    "User-Agent": joi.string(),
    "Accept-Encoding": joi.string(),
    Host: joi.string(),
    Accept: joi.string(),
    Connection: joi.string(),
    token: joi.string().required(),
  }),
  id: joi.string().custom(objectIdValidation)
};

export default generalFields;
