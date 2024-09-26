import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const createWishList = {
  body: joi
    .object({
      productId: generalFields.id.required(),
    })
    .required(),

  headers: generalFields.headers.required(),
};
