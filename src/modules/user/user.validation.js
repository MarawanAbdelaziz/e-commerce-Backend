import joi from "joi";

export const createUserValidation = joi.object({
  firstName: joi.string().min(3).max(15).required(),
  lastName: joi.string().min(3).max(15).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  recoveryEmail: joi.string().email(),
  DOB: joi
    .string()
    .pattern(/^\d{4}-\d{2}-(\d{1,2})$/)
    .required(),
  mobileNumber: joi
    .string()
    .pattern(/^(010|011|012|015)\d{8}$/)
    .required(),
  role: joi.string().valid("company_HR", "user").required(),
});

export const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const updateUserValidation = joi.object({
  firstName: joi.string().min(3).max(15).required(),
  lastName: joi.string().min(3).max(15).required(),
  email: joi.string().email().required(),
  recoveryEmail: joi.string().email(),
  DOB: joi
    .string()
    .pattern(/^\d{4}-\d{2}-(\d{1,2})$/)
    .required(),
  mobileNumber: joi
    .string()
    .pattern(/^(010|011|012|015)\d{8}$/)
    .required(),
});

export const updatePasswordValidation = joi.object({
  password: joi.string().required(),
});

// createOtpForgetPasswordValidation
export const COFPV = joi.object({
  email: joi.string().email().required(),
});

//

export const forgetPasswordValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  otp: joi.string().required(),
});
