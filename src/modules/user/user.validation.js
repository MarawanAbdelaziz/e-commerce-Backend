import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const register = {
  body: generalFields.user.required(),
};
export const login = {
  body: generalFields.user,
  // headers: generalFields.headers,
};
