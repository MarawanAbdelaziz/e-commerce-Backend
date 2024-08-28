import express from "express";

import * as UC from "./user.controller.js";

const userRouter = express.Router();

userRouter
  .post("/", UC.register)
  .get("/verifyEmail/:token", UC.verifyEmail)
  .get("/refreshEmail", UC.refreshEmail)
  .patch("/forgetPassword", UC.forgetPassword)
  .patch("/resetPassword", UC.resetPassword)
  .get("/login", UC.login);

export default userRouter;
