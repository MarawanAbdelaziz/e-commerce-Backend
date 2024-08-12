import express from "express";

import * as SC from "./controllers/subCategory.controller.js";
import multerLoacl, { validExtension } from "../../services/multerLocal.js";

const subCategoryRouter = express.Router();

subCategoryRouter
  .post("/", multerLoacl(validExtension.image,'subCategory').single("image"), SC.addSubCategory)
  .get("/allSubCategories", SC.getAllSubCategories)
  .get("/:slug", SC.getSubCategory)
  .put("/:slug", multerLoacl(validExtension.image,'subCategory').single("image"), SC.updateSubCategory)
  .delete("/:slug", SC.deleteSubCategory);

export default subCategoryRouter;
