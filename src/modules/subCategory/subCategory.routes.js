import express from "express";

import * as SC from "./subCategory.controller.js";
import { multerHost, validExtension } from "../../middleware/multer.js";
import validation from "../../middleware/validation.js";
import * as SCV from "./subCategory.validation.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";

const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
  .post("/", auth([systemRoles.admin]), validation(SCV.subCategory), SC.addSubCategory)
  .get("/", SC.getSpecificCategory)
  .get("/", SC.getAllSubCategories)
  .get("/:slug", SC.getSubCategory)
  .put("/:slug", auth([systemRoles.admin]), validation(SCV.subCategory), SC.updateSubCategory)
  .delete("/:slug", auth([systemRoles.admin]), SC.deleteSubCategory);

export default subCategoryRouter;
