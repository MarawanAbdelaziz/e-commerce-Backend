import jwt from "jsonwebtoken";
import userModel from "../../DB/models/uesrModel.js";

const auth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      res.status(404).json({ message: "Give me your token" });
    }

    const decode = jwt.verify(token, "Mero123456");
    const user = await userModel.findById({ _id: decode.id });

    if (!user) {
      res.status(404).json({ message: "token expired or user not exist" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export default auth;
