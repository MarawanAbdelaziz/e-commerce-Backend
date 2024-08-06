import slug from "slug";
import productModel from "../../../../DB/models/productModel.js";
import asyncHandler from "../../../middleware/asyncHandler.js";

export const addProduct = asyncHandler(async (req, res, next) => {
  const findProduct = await productModel.findOne({ name: req.body.name });
  if (findProduct) {
    return next(new Error("This Product name already exist"));
  }
  req.body.slug = slug(req.body.name);
  const product = await productModel.create(req.body);

  res.status(201).json({ product });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {});

export const getProduct = asyncHandler(async (req, res, next) => {});

export const updateProduct = asyncHandler(async (req, res, next) => {});

export const deleteProduct = asyncHandler(async (req, res, next) => {});
