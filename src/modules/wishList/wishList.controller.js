import wishListModel from "../../../DB/models/wishListModel.js";
import productModel from "../../../DB/models/productModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";

export const createWishList = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await productModel.findOne({
    _id: productId,
  });
  if (!product) {
    return next(new Error("product not exist or out of stock", { cause: 404 }));
  }

  let wishListExist = await wishListModel.findOne({ user: req.user._id });

  if (!wishListExist) {
    const wishList = await wishListModel.create({
      user: req.user._id,
      products: [productId],
    });
    return res.status(201).json({ status: "done", wishList });
  }

  await wishListModel.updateOne(
    {
      user: req.user._id,
    },
    {
      $addToSet: { products: productId },
    }
  );

  return res.status(201).json({ status: "done" });
});
