import slug from "slug";
import categoryModel from "../../../../DB/models/categoryModel.js";
import asyncHandler from "../../../middleware/asyncHandler.js";

export const addCategory = asyncHandler(async (req, res, next) => {
  const findCategory = await categoryModel.findOne({ name: req.body.name });
  if (findCategory) {
    return next(new Error("This category name already exist"));
  }
  req.body.slug = slug(req.body.name);
  const category = await categoryModel.create(req.body);

  res.status(201).json({ category });
});

export const getAllCategories = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.find();
  if (category.length == 0) {
    return next(new Error("there is no categories"), { cause: 404 });
  }
  res.json({ category });
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  const category = await categoryModel.findOne({ slug: slug.toLowerCase() });

  if (!category) {
    return next(new Error("there is no category with this name"), {
      cause: 404,
    });
  }

  res.json({ category });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const slugName = req.params.slug;
  const { name } = req.body;

  const findCategory = await categoryModel.findOne({ name });
  if (findCategory) {
    return next(new Error("This name is already taken"));
  }

  req.body.slug = slug(name);

  const category = await categoryModel.findOneAndUpdate(
    { slug: slugName.toLowerCase() },
    req.body
  );

  if (!category) {
    return next(
      new Error("there is no category with this name", { cause: 404 })
    );
  }

  res.json({ Message: "updated" });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  const category = await categoryModel.findOneAndDelete({
    slug: slug.toLowerCase(),
  });

  if (!category) {
    return next(
      new Error("there is no category with this name", { cause: 404 })
    );
  }

  res.json({ Message: "Category deleted", category });
});
