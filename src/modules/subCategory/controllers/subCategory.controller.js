import slug from "slug";
import subCategoryModel from "../../../../DB/models/subGategoryModel.js";
import asyncHandler from "../../../middleware/asyncHandler.js";

export const addSubCategory = asyncHandler(async (req, res, next) => {
  const findSubCategory = await subCategoryModel.findOne({
    name: req.body.name,
  });
  if (findSubCategory) {
    return next(new Error("This subCategory name already exist"));
  }
  req.body.slug = slug(req.body.name);
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
  if (findSubCategory) {
    return next(new Error("This name is already taken"));
  }

  name && (req.body.slug = slug(name));

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
