import joi from "joi";

export const addSubCategory = {
    body: joi.object({
        name: joi.string().min(3).max(32).required(),
    }).required(),
  params: joi.object({
    categorySlug: joi.string().min(3).max(50).required(),
  }),
};
