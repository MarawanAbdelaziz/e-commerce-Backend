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
  .get("/", auth([systemRoles.admin, systemRoles.user]), SC.getSpecificCategory)
  .get("/", auth([systemRoles.admin, systemRoles.user]), SC.getAllSubCategories)
  .get("/:slug", auth([systemRoles.admin, systemRoles.user]), SC.getSubCategory)
  .put("/:slug", auth([systemRoles.admin]), validation(SCV.subCategory), SC.updateSubCategory)
  .delete("/:slug", auth([systemRoles.admin]), SC.deleteSubCategory);

export default subCategoryRouter;
