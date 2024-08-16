import slug from "slug";
import subCategoryModel from "../../../DB/models/subGategoryModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import categoryModel from "../../../DB/models/categoryModel.js";
import fs from "fs";

export const addSubCategory = asyncHandler(async (req, res, next) => {
  const findSubCategory = await subCategoryModel.findOne({
    name: req.body.name,
  });
  const findCategory = await categoryModel.findById({
    _id: req.body.category,
  });

  if (findSubCategory) {
    return next(new Error("This subCategory name already exist"));
  }
  if (!findCategory) {
    return next(
      new Error("there is no category, please try again", { cause: 404 })
    );
  }

  req.body.slug = slug(req.body.name);
  req.file.path && (req.body.image = req.file.path);

  const subCategory = await subCategoryModel.create(req.body);

  res.status(201).json({ subCategory });
});

export const getAllSubCategories = asyncHandler(async (req, res, next) => {
  const subCategory = await subCategoryModel.find().populate("category");
  if (subCategory.length == 0) {
    return next(new Error("there is no subCategories"), { cause: 404 });
  }
  res.json({ subCategory });
});

export const getSubCategory = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  const subCategory = await subCategoryModel
    .findOne({ slug })
    .populate("category");

  if (!subCategory) {
    return next(new Error("there is no subCategory with this name"), {
      cause: 404,
    });
  }

  res.json({ subCategory });
});

export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const slugName = req.params.slug;
  const { name } = req.body;

  const findSubCategory = await subCategoryModel.findOne({ name });
  const findCategory = await categoryModel.findById({
    _id: req.body.category,
  });

  if (findSubCategory) {
    return next(new Error("This name is already taken"));
  }
  if (!findCategory) {
    return next(
      new Error("there is no category, please try again", { cause: 404 })
    );
  }

  name && (req.body.slug = slug(name));
  req.file.path && (req.body.image = req.file.path);

  const subCategory = await subCategoryModel.findOneAndUpdate(
    { slug: slugName },
    req.body
  );
  req.file.path && fs.unlink(category.image, () => {});

  if (!subCategory) {
    return next(
      new Error("there is no subCategory with this name", { cause: 404 })
    );
  }

  res.json({ Message: "updated" });
});

export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  const subCategory = await subCategoryModel
    .findOneAndDelete({ slug })
    .populate("category");

  if (!subCategory) {
    return next(
      new Error("there is no subCategory with this name", { cause: 404 })
    );
  }

  res.json({ Message: "SubCategory deleted", subCategory });
});
