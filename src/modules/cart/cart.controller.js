import couponModel from "../../../DB/models/couponModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";

//================================= addCoupon ===================================//

export const addCoupon = asyncHandler(async (req, res, next) => {
  const { code } = req.body;

  const findCoupon = await couponModel.findOne({ code: code.toLowerCase() });

  if (findCoupon) {
    return next(new Error("coupon already exist", { cause: 409 }));
  }

  req.body.createdBy = req.user._id;

  const coupon = await couponModel.create(req.body);

  res.json({ message: "done", coupon });
});

//================================= updateCoupon ===================================//

export const updateCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const findCoupon = await couponModel.findOneAndUpdate(
    { _id: id, createdBy: req.user._id },
    req.body,
    { new: true }
  );
  console.log(findCoupon);

  if (!findCoupon) {
    return next(
      new Error("coupon not exist or you don't have permission", {
        cause: 404,
      })
    );
  }

  res.json({ message: "Coupon updated", findCoupon });
});
