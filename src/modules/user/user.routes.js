import express from "express";

import * as UC from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/", UC.register);
// .get("/", UC.verifyEmail)
// .patch("/:slug", UC.forgetPassword)
// .patch("/:slug", UC.resetPassword)
// .post("/:slug", UC.signIn);

export default userRouter;
