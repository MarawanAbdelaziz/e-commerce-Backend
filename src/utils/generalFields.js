import joi from "joi";
import mongoose from "mongoose";

const objectIdValidation = (value, helper) => {
  return mongoose.Types.ObjectId.isValid(value)
    ? true
    : helper.message("invalid id");
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
    "postman-token": joi.string(),
    "content-type": joi.string(),
    "content-length": joi.string(),
    "user-agent": joi.string(),
    "accept-encoding": joi.string(),
    host: joi.string(),
    accept: joi.string(),
    connection: joi.string(),
    token: joi.string().required(),
  }),
  user: joi.object({
    name: joi.string().min(3).max(30),
    email: joi.string().email(),
    phone: joi.array().items(
      joi
        .string()
        .pattern(/^01[0125][0-9]{8}$/)
        .messages({
          "string.pattern.base": "Phone number must be a valid Egyptian number",
        })
    ),
    address: joi.array().items(joi.string().min(3).max(50)),
    password: joi.string().min(5),
    cPassword: joi.any().valid(joi.ref("password")).messages({
      "any.only": "Confirm password does not match",
    }),
  }),
  id: joi.string().custom(objectIdValidation),
};

export default generalFields;
