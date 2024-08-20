import jwt from "jsonwebtoken";
import userModel from "../../DB/models/uesrModel.js";
import asyncHandler from "./asyncHandler.js";

export const auth = (roles=[])=>{
  asyncHandler(async (req, res, next) => {
    const { token } = req.headers;
  
    if (!token) {
      res.status(404).json({ message: "Give me your token" });
    }
  
    const decode = jwt.verify(token, process.env.tokenKey);
    const user = await userModel.findById({ _id: decode.id });
  
    if (!decode?.email) {
      return res.status(400).json({ msg: "invalid token payload" });
    }
    if (!user) {
      res.status(404).json({ message: "token expired or user not exist" });
    }
   // authorization
   if (!roles.includes(user.role)) {
    return res.status(401).json({Message:"you don\'t have premission"})
  }

    req.user = user;
    next();
  })
};

// authorization(['admin','user'])
