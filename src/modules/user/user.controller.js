import userModel from "../../../DB/models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "../../middleware/asyncHandler.js";
import { customAlphabet } from "nanoid";
import sendMail from "../../services/sendEmail.js";

export const register = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const foundUser = await userModel.findOne({ email: email.toLowerCase() });

  if (foundUser) {
    return next(new Error("user already exist", { cause: 409 }));
  }

  req.body.password = bcrypt.hashSync(password, 10);

  const nanoid = customAlphabet("0123456789MEROmero", 6);
  const otpCode = nanoid();

  req.body.code = bcrypt.hashSync(otpCode, 4);

  await sendMail({
    to: email,
    subject: "verify your email",
    html: `<h1>${otpCode}</h1>`,
  });

  const user = await userModel.create(req.body);

  const token = jwt.sign({ id: user._id, email }, "Mero123456");

  res.status(201).json({ message: "done", token });
});
