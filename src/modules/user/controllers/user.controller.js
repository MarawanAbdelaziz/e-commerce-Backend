import jwt from "jsonwebtoken";
import userModel from "../../../../DB/models/uesrModel.js";
import bcrypt from "bcrypt";
import sendMail from "../../../services/sendEmail.js";
import { customAlphabet } from "nanoid";
import asyncHandler from "../../../middleware/asyncHandler.js";

export const createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, mobileNumber } = req.body;

  const findUserEmail = await userModel.findOne({ email });
  const findUser2MobileNumber = await userModel.findOne({ mobileNumber });

  if (findUserEmail || findUser2MobileNumber) {
    return next(
      new Error("This user already exist or your mobile number", { cause: 409 })
    );
  }

  req.body.username = firstName + " " + lastName;
  req.body.password = bcrypt.hashSync(password, 4);

  const user = await userModel.create(req.body);

  return res.status(201).json({ user: user });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return next(new Error("Account or password incorrect"));
  }
  if (!bcrypt.compareSync(password, findUser.password)) {
    return next(new Error("Account or password incorrect"));
  }

  await userModel.updateMany({ _id: findUser._id }, { status: "online" });

  const token = jwt.sign({ id: findUser._id, email }, "Mero123456");

  return res.json({ message: "logged in successfully", token });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { email, mobileNumber } = req.body;

  const findUserEmail = await userModel.findOne({ email });
  const findUser2MobileNumber = await userModel.findOne({ mobileNumber });

  if (findUserEmail || findUser2MobileNumber) {
    return next(
      new Error("This user already exist or your mobile number", { cause: 409 })
    );
  }

  const updateUser = await userModel.updateMany(
    { _id: req.user._id },
    req.body
  );
  return res.status(201).json({ updateUser });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  await userModel.deleteOne({ _id: req.user._id });

  return res.json({ message: "User deleted" });
});

export const userAccountData = asyncHandler(async (req, res, next) => {
  const findUser = await userModel.findById({ _id: req.user._id });

  return res.json({ user: findUser });
});

export const profileDataForAnotherUser = asyncHandler(
  async (req, res, next) => {
    const findUser = await userModel.findById({ _id: req.params.id });

    return res.json({ user: findUser });
  }
);

export const updatePassword = asyncHandler(async (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 4);
  const findUser = await userModel.findByIdAndUpdate(
    { _id: req.user._id },
    { password: req.body.password }
  );

  return res.json({ message: "Password updated", user: findUser });
});

export const createOtpForgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new Error("give me your email", { cause: 404 }));
  }

  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return next(new Error("your Email not correct", { cause: 404 }));
  }

  const nanoid = customAlphabet("0123456789MEROmero", 6);
  const otpCode = nanoid();
  const otpCodeHash = bcrypt.hashSync(otpCode, 4);

  await userModel.findByIdAndUpdate(
    { _id: findUser._id },
    { otp: otpCodeHash }
  );

  await sendMail({
    to: "mero.games2019@gmail.com",
    subject: "Job Search App",
    html: `<h1>${otpCode}</h1>`,
  });

  return res.json({ message: "Otp Sent successfully in your email" });
});

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { newPassword, otp, email } = req.body;

  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return next(new Error("your Email not correct", { cause: 404 }));
  }

  if (!bcrypt.compareSync(otp, findUser.otp)) {
    return next(new Error("your OTP not correct", { cause: 404 }));
  }

  req.body.newPassword = bcrypt.hashSync(newPassword, 4);

  const updateUser = await userModel.findOneAndUpdate(
    { _id: findUser._id },
    { password: req.body.newPassword }
  );

  return res.json({ message: "Password updated", user: updateUser });
});

export const allAccountsHaveSpecificRecoveryEmail = asyncHandler(
  async (req, res, next) => {
    const { recoveryEmail } = req.body;

    if (!recoveryEmail) {
      return next(new Error("give me your recovery email", { cause: 404 }));
    }

    const findUsers = await userModel.find({ recoveryEmail });

    if (!findUsers) {
      return next(
        new Error("gyour recovery email not correct", { cause: 404 })
      );
    }

    res.json({ users: findUsers });
  }
);
