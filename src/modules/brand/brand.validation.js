import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const brand = {
  body: joi.object({
    name: joi.string().min(3).max(30).required(),
  }),
  headers: generalFields.headers,
};
