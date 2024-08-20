import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const putProduct = {
  body: joi.object({
    name: joi.string().min(3).max(50),
  }),

  files: joi.array().items(generalFields.file).required().label("images"),
};
