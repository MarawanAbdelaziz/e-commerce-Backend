import slug from "slug";
import productModel from "../../../DB/models/productModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import categoryModel from "../../../DB/models/categoryModel.js";
import brandModel from "../../../DB/models/brandModel.js";
import subCategoryModel from "../../../DB/models/subGategoryModel.js";
import fs from "fs";
import cloudinary from "../../utils/cloudinary.js";

export const addProduct = asyncHandler(async (req, res, next) => {
  const findProduct = await productModel.findOne({
    name: req.body.name,
  });

  if (findProduct) {
    return next(new Error("This product name already exist"));
  }

  const [findCategory, findSubCategory, findBrand] = await Promise.all([
    categoryModel.findById(req.body.category),
    subCategoryModel.findById(req.body.subCategory),
    brandModel.findById(req.body.brand),
  ]);

  if (!findCategory || !findSubCategory || !findBrand) {
    const itemMissing = !findCategory
      ? "category"
      : !findSubCategory
      ? "subCategory"
      : "brand";

    return next(
      new Error(`there is no ${itemMissing}, please try again`, { cause: 404 })
    );
  }

  req.body.slug = slug(req.body.name);
  req.body.createdBy = req.user._id;

  if (req.files.length) {
    const images = [];
    for (const file of req.files) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        file.path,
        {
          folder: "product",
        }
      );

      images.push({ public_id, secure_url });
    }

    req.body.images = images;
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
  const { name, category, subCategory, brand } = req.body;

  const findProduct = await productModel.findOne({ name });
  if (findProduct) {
    return next(new Error("This name is already taken"));
  }

  if ((category && subCategory == null) || (category == null && subCategory)) {
    return next(
      new Error(`plasee give me category and subCategory or i will kill you`, {
        cause: 400,
      })
    );
  }
  if (category && subCategory) {
    const findCategory = await categoryModel.findById(category);
    const findSubCategory = await subCategoryModel.findById(subCategory);

    if (!findCategory || !findSubCategory) {
      const itemMissing = !findCategory ? "category" : "subCategory";

      return next(
        new Error(`there is no ${itemMissing}, please try again`, {
          cause: 404,
        })
      );
    }
  }

  if (brand) {
    const findBrand = await brandModel.findById(brand);
    if (!findBrand) {
      return next(
        new Error(`there is no brand, please try again`, {
          cause: 404,
        })
      );
    }
  }

  name && (req.body.slug = slug(name));
  req.body.updatedBy = req.user._id;

  if (req.files.length) {
    const images = [];
    for (const file of req.files) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        file.path,
        {
          folder: "product",
        }
      );

      images.push({ public_id, secure_url });
    }

    req.body.images = images;
  }

  const product = await productModel.findOneAndUpdate(
    { slug: slugName },
    req.body
  );

  if (req.files.length) {
    await cloudinary.api.delete_resources(
      product.images.map((file) => file.public_id)
    );
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

  await cloudinary.api.delete_resources(
    product.images.map((file) => file.public_id)
  );

  if (!product) {
    return next(
      new Error("there is no product with this name", { cause: 404 })
    );
  }

  res.json({ Message: "product deleted", product });
});
