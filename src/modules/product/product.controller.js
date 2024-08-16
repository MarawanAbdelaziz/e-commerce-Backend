import slug from "slug";
import productModel from "../../../DB/models/productModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import categoryModel from "../../../DB/models/categoryModel.js";
import brandModel from "../../../DB/models/brandModel.js";
import subCategoryModel from "../../../DB/models/subGategoryModel.js";
import fs from "fs";

export const addProduct = asyncHandler(async (req, res, next) => {
  const findProduct = await productModel.findOne({
    name: req.body.name,
  });

  const findCategory = await categoryModel.findById({
    _id: req.body.category,
  });
  const findSubCategory = await subCategoryModel.findById({
    _id: req.body.subCategory,
  });
  const findBrand = await brandModel.findById({
    _id: req.body.brand,
  });

  if (findProduct) {
    return next(new Error("This product name already exist"));
  }

  if (!findCategory || !findSubCategory || !findBrand) {
    let itemMissing = "";

    !findCategory && (itemMissing = "category");
    !findSubCategory && (itemMissing = "subCategory");
    !findBrand && (itemMissing = "brand");

    return next(
      new Error(`there is no ${itemMissing}, please try again`, { cause: 404 })
    );
  }

  req.body.slug = slug(req.body.name);
  req.files.image.length && (req.body.image = req.files.image[0].path);

  if (req.files.images.length) {
    const images = [];
    for (const element of req.files.images) {
      images.push(element.path);
    }

    req.body.coverImages = images;
  }

  const product = await productModel.create(req.body);

  res.status(201).json({ product });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel
    .find()
    .populate("category")
    .populate("brand")
    .populate("subCategory");
  if (products.length == 0) {
    return next(new Error("there is no products"), { cause: 404 });
  }
  res.json({ products });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  const product = await productModel
    .findOne({ slug })
    .populate("category")
    .populate("brand")
    .populate("subCategory");

  if (!product) {
    return next(new Error("there is no product with this name"), {
      cause: 404,
    });
  }

  res.json({ product });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const slugName = req.params.slug;
  const { name } = req.body;

  const findProduct = await productModel.findOne({ name });
  const findCategory = await categoryModel.findById({
    _id: req.body.category,
  });
  const findSubCategory = await subCategoryModel.findById({
    _id: req.body.subCategory,
  });
  const findBrand = await brandModel.findById({
    _id: req.body.brand,
  });

  if (findProduct) {
    return next(new Error("This name is already taken"));
  }
  if (!findCategory || !findSubCategory || !findBrand) {
    let itemMissing = "";

    !findCategory && (itemMissing = "category");
    !findSubCategory && (itemMissing = "subCategory");
    !findBrand && (itemMissing = "brand");

    return next(
      new Error(`there is no ${itemMissing}, please try again`, { cause: 404 })
    );
  }

  name && (req.body.slug = slug(name));
  req.files.image.length && (req.body.image = req.files.image[0].path);

  if (req.files.images.length) {
    const images = [];
    for (const element of req.files.images) {
      images.push(element.path);
    }
    req.body.coverImages = images;
  }

  const product = await productModel.findOneAndUpdate(
    { slug: slugName },
    req.body
  );

  req.files.image[0].path && fs.unlink(product.image, () => {});

  if (req.files.images.length) {
    for (const element of product.coverImages) {
      fs.unlink(element, () => {});
    }
  }

  if (!product) {
    return next(
      new Error("there is no product with this name", { cause: 404 })
    );
  }

  res.json({ Message: "updated" });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  const product = await productModel
    .findOneAndDelete({ slug })
    .populate("category")
    .populate("brand")
    .populate("subCategory");

  if (!product) {
    return next(
      new Error("there is no product with this name", { cause: 404 })
    );
  }

  res.json({ Message: "product deleted", product });
});
