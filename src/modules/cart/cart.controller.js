import cartModel from "../../../DB/models/cartModel.js";
import productModel from "../../../DB/models/productModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";

//=================================== addCart ===================================//

export const addCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const findProduct = await productModel.findOne({
    _id: productId,
    stock: { $gte: quantity },
  });

  if (!findProduct) {
    return next(new Error("product not exist or out of stock", { cause: 404 }));
  }

  const findCart = await cartModel.findOne({ user: req.user._id });

  if (!findCart) {
    const cart = await cartModel.create({
      user: req.user._id,
      products: [
        {
          productId,
          quantity,
        },
      ],
    });

    return res.json({ message: "done", cart });
  }

  let flag = false;

  for (const product of findCart.products) {
    if (productId == product.productId) {
      product.quantity += quantity;
      flag = true;
    }
  }

  if (!flag) {
    findCart.products.push({
      productId,
      quantity,
    });
  }

  await findCart.save();
  res.json({ message: "done", cart: findCart });
});

//=================================== removeCart ===================================//

export const removeCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  const findCart = await cartModel.findOneAndUpdate(
    { user: req.user._id, "products.productId": productId },
    { $pull: { products: { productId } } },
    { new: true }
  );

  await findCart.save();
  res.json({ message: "done", cart: findCart });
});

//=================================== clearCart ===================================//

export const clearCart = asyncHandler(async (req, res, next) => {
  const findCart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { products: [] },
    { new: true }
  );
  await findCart.save();
  res.json({ message: "done", cart: findCart });
});

//=================================== getCart ===================================//

export const getCart = asyncHandler(async (req, res, next) => {
  const findCart = await cartModel.findOne({ user: req.user._id });

  if (!findCart) {
    next(new Error("you don't have cart yet", { cause: 404 }));
  }

  res.json({ message: "done", cart: findCart });
});
