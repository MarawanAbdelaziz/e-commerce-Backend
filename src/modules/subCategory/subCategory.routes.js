import express from "express";

import * as SC from "./subCategory.controller.js";
import { multerHost, validExtension } from "../../middleware/multer.js";

const subCategoryRouter = express.Router();

subCategoryRouter
  .post(
    "/",
    multerHost(validExtension.image).single("image"),
    SC.addSubCategory
  )
  .get("/", SC.getAllSubCategories)
  .get("/:slug", SC.getSubCategory)
  .put(
    "/:slug",
    multerHost(validExtension.image).single("image"),
    SC.updateSubCategory
  )
  .delete("/:slug", SC.deleteSubCategory);

export default subCategoryRouter;
