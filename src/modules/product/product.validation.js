import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addProduct = {
  body: joi.object({
    name: joi.string().min(3).max(50).required(),
    price: joi.number().min(0).max(500000).required(),
    stock: joi.number().min(0).max(200).required(),
    category: generalFields.id.required(),
    subCategory: generalFields.id.required(),
    brand: generalFields.id.required(),
  }),

  files: joi.array().items(generalFields.file).required().label("images"),
};

export const putProduct = {
  body: joi.object({
    name: joi.string().min(3).max(50),
    price: joi.number().min(0).max(500000),
    stock: joi.number().min(0).max(200),
    category: generalFields.id,
    subCategory: generalFields.id,
    brand: generalFields.id,
  }),

  files: joi.array().items(generalFields.file).label("images"),
};