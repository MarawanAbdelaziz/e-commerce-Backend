import cartModel from "../../../DB/models/cartModel.js";
import couponModel from "../../../DB/models/couponModel.js";
import orderModel from "../../../DB/models/orderModel.js";
import productModel from "../../../DB/models/productModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";

//=================================== createOrder ===================================//

export const createOrder = asyncHandler(async (req, res, next) => {
  const { productId, quantity, couponCode, address, phone, paymentMethod } =
    req.body;

  if (couponCode) {
    const findCoupon = await couponModel.findOne({
      code: couponCode.toLowerCase(),
      usedBy: { $nin: [req.user._id] },
    });

    if (!findCoupon || findCoupon.toDate < Date.now()) {
      return next(new Error("Coupon not exist or expired", { cause: 404 }));
    }
    req.body.coupon = findCoupon;
  }

  let products = [];
  let flag = false;

  if (productId) {
    products = [{ productId, quantity }];
  } else {
    const findCart = await cartModel.findOne({ user: req.user._id });
    if (!findCart.products.length) {
      return next(
        new Error("please add product to create order", { cause: 404 })
      );
    }
    products = findCart.products;
    flag = true;
  }

  let finalProducts = [];
  let subPrice = 0;

  for (let product of products) {
    const findProduct = await productModel.findOne({
      _id: product.productId,
      stock: { $gte: product.quantity },
    });
    if (!findProduct) {
      return next(
        new Error("Product not exist or out of stock", { cause: 404 })
      );
    }

    if (flag) {
      product = product.toJSON();
    }

    product.title = findProduct.name;
    product.price = findProduct.price;

    product.finalPrice = Number(findProduct.subPrice) * product.quantity;

    subPrice += product.finalPrice;
    finalProducts.push(product);
  }

  const order = await orderModel.create({
    user: req.user._id,
    products: finalProducts,
    subPrice,
    couponId: req.body?.coupon?._id,
    totalPrice:
      subPrice - subPrice * ((Number(req.body.coupon?.amount) || 0) / 100),
    address,
    phone,
    paymentMethod,
    status: paymentMethod == "cash" ? "placed" : "waitPayment",
  });

  if (req.body?.coupon) {
    await couponModel.updateOne(
      {
        code: couponCode.toLowerCase(),
      },
      {
        $push: {
          usedBy: req.user._id,
        },
      }
    );
  }

  for (const product of finalProducts) {
    await productModel.updateOne(
      {
        _id: product.productId,
      },
      {
        $inc: {
          stock: -product.quantity,
        },
      }
    );
  }

  if (flag) {
    await cartModel.updateOne(
      { user: req.user._id },
      {
        products: [],
      }
    );
  }

  res.status(201).json({ message: "done", order });
});

export const cancelOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { reason } = req.body;

  const order = await orderModel.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!order) {
    return next(new Error("order not found", { cause: 404 }));
  }

  if (
    (order.status != "placed" && order.paymentMethod == "cash") ||
    (order.status != "waitPayment" && order.paymentMethod == "card")
  ) {
    return next(new Error("order can not be canceled", { cause: 404 }));
  }

  await orderModel.updateOne(
    {
      _id: id,
    },
    {
      status: "canceled",
      cancelledBy: req.user._id,
      reason,
    }
  );

  if (order?.couponId) {
    await couponModel.updateOne(
      {
        _id: order.couponId,
      },
      {
        $pull: {
          usedBy: req.user._id,
        },
      }
    );
  }

  for (const product of order.products) {
    await productModel.updateOne(
      {
        _id: product.productId,
      },
      {
        $inc: {
          stock: product.quantity,
        },
      }
    );
  }

  return res.status(201).json({ status: "done", order });
});
