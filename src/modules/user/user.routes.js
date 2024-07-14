import express from "express";
import * as UC from "./controllers/user.controller.js";
import auth from "../../middleware/auth.js";
import * as UV from "./user.validation.js";
import validation from "../../middleware/validation.js";

const userRouter = express.Router();

userRouter.post("/", validation(UV.createUserValidation), UC.createUser);
userRouter.get("/", validation(UV.loginValidation), UC.login);

userRouter.put("/", validation(UV.updateUserValidation), auth, UC.updateUser);
userRouter.delete("/", auth, UC.deleteUser);

userRouter.get("/userAccountData", auth, UC.userAccountData);
userRouter.get("/profileDataForAnotherUser/:id", UC.profileDataForAnotherUser);
userRouter.patch("/", validation(UV.updatePasswordValidation), auth, UC.updatePassword);

userRouter.post("/createOtpForgetPassword", validation(UV.COFPV), UC.createOtpForgetPassword);
userRouter.post("/forgetPassword",validation(UV.forgetPasswordValidation), UC.forgetPassword);

userRouter.get("/allAccountsHaveSpecificRecoveryEmail", validation(UV.COFPV), UC.allAccountsHaveSpecificRecoveryEmail );

export default userRouter;
