import slug from "slug";
import subCategoryModel from "../../../../DB/models/subGategoryModel.js";
import asyncHandler from "../../../middleware/asyncHandler.js";

export const addSubCategory = asyncHandler(async (req, res, next) => {
  const findSubCategory = await subCategoryModel.findOne({ name: req.body.name });
  if (findSubCategory) {
    return next(new Error("This subCategory name already exist"));
  }
  req.body.slug = slug(req.body.name);
  const subCategory = await subCategoryModel.create(req.body);

  res.status(201).json({ subCategory });
});

export const getAllSubCategories = asyncHandler(async (req, res, next) => {});

export const getSubCategory = asyncHandler(async (req, res, next) => {});

export const updateSubCategory = asyncHandler(async (req, res, next) => {});

export const deleteSubCategory = asyncHandler(async (req, res, next) => {});
