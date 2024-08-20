import userModel from "../../../DB/models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "../../middleware/asyncHandler.js";
import sendMail, { htmlEmailVerify } from "../../services/sendEmail.js";

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

  req.body.password = bcrypt.hashSync(password, Number(process.env.roundNum));

  const user = await userModel.create(req.body);

  res.status(201).json({ message: "done" });
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

//================================= verifyEmail ===================================//

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
