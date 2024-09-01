import express from "express";

import * as UC from "./user.controller.js";
import validation from "../../middleware/validation.js";
import * as PV from "./user.validation.js";

const userRouter = express.Router();

userRouter
  .post("/", validation(PV.register) ,UC.register)
  .get("/verifyEmail/:token", UC.verifyEmail)
  .get("/refreshEmail", UC.refreshEmail)
  .patch("/forgetPassword", UC.forgetPassword)
  .patch("/resetPassword", UC.resetPassword)
  .post("/login", UC.login);

export default userRouter;
