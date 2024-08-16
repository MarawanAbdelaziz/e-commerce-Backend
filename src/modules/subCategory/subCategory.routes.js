import express from "express";

import * as SC from "./subCategory.controller.js";
import { multerHost, validExtension } from "../../middleware/multer.js";

const subCategoryRouter = express.Router();

subCategoryRouter
  .post("/", SC.addSubCategory)
  .get("/", SC.getAllSubCategories)
  .get("/:slug", SC.getSubCategory)
  .put("/:slug", SC.updateSubCategory)
  .delete("/:slug", SC.deleteSubCategory);

export default subCategoryRouter;
