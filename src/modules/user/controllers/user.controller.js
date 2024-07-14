import jwt from "jsonwebtoken";
import userModel from "../../../../DB/models/uesrModel.js";

import bcrypt from "bcrypt";
import sendMail from "../../../services/sendEmail.js";
import { customAlphabet } from "nanoid";

export const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, mobileNumber } = req.body;

    const findUserEmail = await userModel.findOne({ email });
    const findUser2MobileNumber = await userModel.findOne({ mobileNumber });

    if (findUserEmail || findUser2MobileNumber) {
      return res
        .status(409)
        .json({ message: "This user already exist or your mobile number" });
    }

    req.body.username = firstName + " " + lastName;
    req.body.password = bcrypt.hashSync(password, 4);

    const user = await userModel.create(req.body);

    return res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "Account or password incorrect" });
    }
    if (!bcrypt.compareSync(password, findUser.password)) {
      return res.status(400).json({ message: "Account or password incorrect" });
    }

    await userModel.updateMany({ _id: findUser._id }, { status: "online" });

    const token = jwt.sign({ id: findUser._id, email }, "Mero123456");

    return res.json({ message: "logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { email, mobileNumber } = req.body;

    const findUserEmail = await userModel.findOne({ email });
    const findUser2MobileNumber = await userModel.findOne({ mobileNumber });

    if (findUserEmail || findUser2MobileNumber) {
      return res
        .status(409)
        .json({ message: "This user already exist or your mobile number" });
    }

    const updateUser = await userModel.updateMany(
      { _id: req.user._id },
      req.body
    );
    return res.status(201).json({ updateUser });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await userModel.deleteOne({ _id: req.user._id });

    return res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const userAccountData = async (req, res, next) => {
  try {
    const findUser = await userModel.findById({ _id: req.user._id });

    return res.json({ user: findUser });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const profileDataForAnotherUser = async (req, res, next) => {
  try {
    const findUser = await userModel.findById({ _id: req.params.id });

    return res.json({ user: findUser });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 4);
    const findUser = await userModel.findByIdAndUpdate(
      { _id: req.user._id },
      { password: req.body.password }
    );

    return res.json({ message: "Password updated", user: findUser });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const createOtpForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({ message: "give me your email" });
    }

    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return res.status(404).json({ message: "your Email not correct" });
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
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { newPassword, otp, email } = req.body;

    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return res.status(404).json({ message: "your Email not correct" });
    }

    if (!bcrypt.compareSync(otp, findUser.otp)) {
      return res.status(404).json({ message: "your OTP not correct" });
    }

    req.body.newPassword = bcrypt.hashSync(newPassword, 4);

    const updateUser = await userModel.findOneAndUpdate(
      { _id: findUser._id },
      { password: req.body.newPassword }
    );

    return res.json({ message: "Password updated", user: updateUser });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const allAccountsHaveSpecificRecoveryEmail = async (req, res, next) => {
  const { recoveryEmail } = req.body;

  if (!recoveryEmail) {
    return res.status(404).json({ message: "give me your recovery email" });
  }

  const findUsers = await userModel.find({ recoveryEmail });

  if (!findUsers) {
    return res.status(404).json({ message: "your recovery email not correct" });
  }

  res.json({ users: findUsers });
};
