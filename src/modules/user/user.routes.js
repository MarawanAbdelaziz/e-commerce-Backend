import express from "express";
import * as UC from "./controllers/user.controller.js";
import auth from "../../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/", UC.createUser);
userRouter.get("/", UC.login);

userRouter.put("/", auth, UC.updateUser);
userRouter.delete("/", auth, UC.deleteUser);

userRouter.get("/userAccountData", auth, UC.userAccountData);
userRouter.get("/profileDataForAnotherUser/:id", UC.profileDataForAnotherUser);
userRouter.patch("/", auth, UC.updatePassword);

userRouter.post("/createOtpForgetPassword", UC.createOtpForgetPassword);
userRouter.post("/forgetPassword", UC.forgetPassword);

userRouter.get(
  "/allAccountsHaveSpecificRecoveryEmail",
  UC.allAccountsHaveSpecificRecoveryEmail
);

export default userRouter;
