import userModel from "../../../DB/models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "../../middleware/asyncHandler.js";
import sendMail, { htmlEmailVerify } from "../../services/sendEmail.js";
import { customAlphabet } from "nanoid";

//================================= register =======================================//

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const findUser = await userModel.findOne({ email: email.toLowerCase() });

  if (findUser) {
    return next(new Error("user already exist", { cause: 409 }));
  }

  const token = jwt.sign({ email }, process.env.tokenKey, {
    expiresIn: 60 * 5,
  });
  const link = `${req.protocol}://${req.headers.host}/user/verifyEmail/${token}`;

  await sendMail({
    to: email,
    subject: "Verify Your Email",
    html: htmlEmailVerify(link, name),
  });

  req.body.password = bcrypt.hashSync(password, Number(process.env.hashNum));

  const user = await userModel.create(req.body);

  res.status(201).json({ message: "done", user });
});

//================================= verifyEmail ===================================//

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  const decoded = jwt.verify(token, process.env.tokenKey);

  if (!decoded.email) {
    return next(new Error("invalid token"));
  }

  const user = await userModel.findOneAndUpdate(
    { email: decoded.email, confirmed: false },
    { confirmed: true }
  );

  if (!user) {
    res.status(400).json({ message: "user not exist or already confirmed" });
  }

  res.json({ message: "Email confirmed" });
});

//================================= refreshEmail ===================================//

export const refreshEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email, confirmed: false });

  if (!user) {
    return next(
      new Error("User not exist or already confirmed", { cause: 404 })
    );
  }

  const token = jwt.sign({ email }, process.env.tokenKey, {
    expiresIn: 60 * 5,
  });
  const link = `${req.protocol}://${req.headers.host}/user/verifyEmail/${token}`;

  await sendMail({
    to: email,
    subject: "Verify Your Email",
    html: htmlEmailVerify(link),
  });

  res.json({ message: "Email send" });
});

//================================= forgetPassword ===================================//

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const findUser = await userModel.findOne({ email: email.toLowerCase() });
  if (!findUser) {
    return next(new Error("user not exist", { cause: 404 }));
  }

  const nano = customAlphabet("Mmero33557", 6);
  const code = nano();

  await sendMail({
    to: email,
    subject: "OTP forget password",
    html: `<h1> OTP: ${code} </h1>`,
  });
  await userModel.findOneAndUpdate({ email }, { code });

  res.json({ message: "lock at your mail" });
});

//================================= resetPassword ===================================//

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, code, password } = req.body;

  const findUser = await userModel.findOne({ email: email.toLowerCase() });
  if (!findUser) {
    return next(new Error("user not exist", { cause: 404 }));
  }
  if (findUser.code != code) {
    return next(new Error("incorrect OTP or already uesd"));
  }

  req.body.password = bcrypt.hashSync(password, +process.env.hashNum);

  console.log(req.body.password);

  await userModel.findOneAndUpdate(
    { email },
    {
      password: req.body.password,
      $unset: { code: 1 },
      passwordChangeAt: Date.now(),
    }
  );

  res.json({ message: "Done" });
});

//================================= login ===================================//

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const unconfirmedUser = await userModel.findOne({
    email: email.toLowerCase(),
    confirmed: false,
  });

  if (unconfirmedUser) {
    return next(new Error("Please verify your email address"));
  }

  const findUser = await userModel.findOne({
    email: email.toLowerCase(),
    confirmed: true,
  });

  if (!findUser || !bcrypt.compareSync(password, findUser.password)) {
    return next(new Error("Invalid email or password", { cause: 404 }));
  }

  const token = jwt.sign(
    { id: findUser._id, email, role: findUser.role },
    process.env.tokenKey
  );

  await userModel.updateOne({ email }, { loggedIn: true });

  res.json({ message: "Done", token });
});
