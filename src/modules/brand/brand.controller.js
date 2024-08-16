import slug from "slug";
import brandModel from "../../../DB/models/brandModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import fs from "fs";
import cloudinary from "../../utils/cloudinary.js";

export const addBrand = asyncHandler(async (req, res, next) => {
  const findBrand = await brandModel.findOne({ name: req.body.name });
  if (findBrand) {
    return next(new Error("This brand name already exist"));
  }
  req.body.slug = slug(req.body.name);

  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "brand",
    }
  );

  req.file.path && (req.body.image = { public_id, secure_url });

  const brand = await brandModel.create(req.body);

  res.status(201).json({ brand });
});

export const getAllBrands = asyncHandler(async (req, res, next) => {
  const brand = await brandModel.find();
  if (brand.length == 0) {
    return next(new Error("there is no brands"), { cause: 404 });
  }
  res.json({ brand });
});

export const getBrand = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  const brand = await brandModel.findOne({ slug });

  if (!brand) {
    return next(new Error("there is no brand with this name"), {
      cause: 404,
    });
  }

  res.json({ brand });
});

export const updateBrand = asyncHandler(async (req, res, next) => {
  const slugName = req.params.slug;
  const { name } = req.body;

  const findBrand = await brandModel.findOne({ name });
  if (findBrand) {
    return next(new Error("This name is already taken"));
  }

  req.body.slug = slug(name);
  req.file.path && (req.body.image = req.file.path);

  const brand = await brandModel.findOneAndUpdate({ slug: slugName }, req.body);

  req.file.path && fs.unlink(category.image, () => {});

  if (!brand) {
    return next(new Error("there is no brand with this name", { cause: 404 }));
  }

  res.json({ Message: "updated" });
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  const brand = await brandModel.findOneAndDelete({ slug });

  if (!brand) {
    return next(new Error("there is no brand with this name", { cause: 404 }));
  }

  res.json({ Message: "Brand deleted", brand });
});
