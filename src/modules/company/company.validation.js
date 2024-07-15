import Joi from "joi";

export const addCompanyValidation = Joi.object({
  companyName: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(4).max(250).required(),
  industry: Joi.string().min(4).max(50).required(),
  address: Joi.string().min(4).max(100).required(),
  numberOfEmployees: Joi.string().required(),
  companyEmail: Joi.string().email().required(),
});
