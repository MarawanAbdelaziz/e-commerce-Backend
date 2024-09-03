import asyncHandler from "../../middleware/asyncHandler.js";

//================================= cartCoupon ===================================//

export const cartCoupon = asyncHandler(async (req, res, next) => {
  const { code } = req.body;


  res.json({ message: "done", coupon });
});

