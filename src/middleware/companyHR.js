import userModel from "../../DB/models/uesrModel.js";

const companyHR = async (req, res, next) => {
  try {
    const _id = req.user._id;

    const findUser = await userModel.findById({ _id });

    if (findUser.role == "user") {
      return res
        .status(400)
        .json({ message: "get out Noooow you are not a HR" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export default companyHR;
