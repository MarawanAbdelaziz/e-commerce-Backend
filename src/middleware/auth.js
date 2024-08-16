import jwt from "jsonwebtoken";
import userModel from "../../DB/models/uesrModel.js";
import asyncHandler from "./asyncHandler.js";

const auth = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    res.status(404).json({ message: "Give me your token" });
  }

  const decode = jwt.verify(token, "Mero123456");
  const user = await userModel.findById({ _id: decode.id });

  if (!decode?.email) {
    return res.status(400).json({ msg: "invalid token payload" });
  }
  if (!user) {
    res.status(404).json({ message: "token expired or user not exist" });
  }

  req.user = user;
  next();
});

export default auth;
