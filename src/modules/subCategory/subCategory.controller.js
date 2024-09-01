import slug from "slug";
import subCategoryModel from "../../../DB/models/subGategoryModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import categoryModel from "../../../DB/models/categoryModel.js";
import fs from "fs";

export const addSubCategory = asyncHandler(async (req, res, next) => {
  const findSubCategory = await subCategoryModel.findOne({
    name: req.body.name,
  });
  const findCategory = await categoryModel.findOne({
    name: req.params.categorySlug,
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
  req.body.category = findCategory._id;
  req.body.createdBy = req.user._id;

  const subCategory = await subCategoryModel.create(req.body);

  res.status(201).json({ subCategory });
});

export const getSpecificCategory = asyncHandler(async (req, res, next) => {
  const slug = req.params.categorySlug;

  const findCategory = await categoryModel.findOne({ slug });

  if (!findCategory) {
    return next(new Error("there is no category with this name"), {
      cause: 404,
    });
  }

  const subCategory = await subCategoryModel
    .find({ category:findCategory._id })
    .populate("category");

  if (!subCategory) {
    return next(new Error("there is no subCategory with this name"), {
      cause: 404,
    });
  }

  res.json({ subCategory });
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
  console.log(slug);

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
  req.body.updatedBy = req.user._id;
  
  const subCategory = await subCategoryModel.findOneAndUpdate(
    { slug: slugName },
    req.body
  );

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
