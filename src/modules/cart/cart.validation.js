import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addCart = {
  body: joi.object({
  
  }),

  headers: generalFields.headers.required(),
};

export const updateCart = {
  body: joi.object({
   
  }),

  headers: generalFields.headers.required(),
};
