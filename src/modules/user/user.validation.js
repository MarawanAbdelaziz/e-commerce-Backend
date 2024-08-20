import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const login = {
  body: joi.object({
    id: generalFields.id,
  }),

  headers: generalFields.headers,
};
