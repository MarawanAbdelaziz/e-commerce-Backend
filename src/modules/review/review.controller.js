import orderModel from "../../../DB/models/orderModel.js";
import productModel from "../../../DB/models/productModel.js";
import reviewModel from "../../../DB/models/reviewModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";

export const createReview = asyncHandler(async (req, res, next) => {
  const { comment, rate } = req.body;
  const { productId } = req.params;

  const productExist = await productModel.findById(productId);
  if (!productExist) {
    return next(new Error("product not exist", { cause: 404 }));
  }

  const reviewExist = await reviewModel.findOne({
    createdBy: req.user._id,
    productId,
  });
  if (reviewExist) {
    return next(new Error("review already exist", { cause: 409 }));
  }

  const order = await orderModel.findOne({
    user: req.user._id,
    "products.productId": productId,
    status: "delivered",
  });
  if (!order) {
    return next(new Error("order not exist", { cause: 409 }));
  }

  const review = await reviewModel.create({
    comment,
    rate,
    productId,
    createdBy: req.user._id,
  });

  let sum = Number(productExist.rateAvg) * Number(productExist.rateNum);
  sum = sum + rate;
  productExist.rateAvg = sum / (productExist.rateNum + 1);
  productExist.rateNum += 1;
  await productExist.save();

  res.status(201).json({ status: "done", review });
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const reviewExist = await reviewModel.findOneAndDelete({
    createdBy: req.user._id,
    _id: id,
  });
  if (!reviewExist) {
    return next(new Error("review not exist", { cause: 404 }));
  }

  const productExist = await productModel.findById(reviewExist.productId);

  let sum = productExist.rateAvg * productExist.rateNum;
  sum = sum - reviewExist.rate;
  productExist.rateAvg = sum / (productExist.rateNum - 1);
  productExist.rateNum -= 1;
  await productExist.save();

  res.status(201).json({ status: "done" });
});
