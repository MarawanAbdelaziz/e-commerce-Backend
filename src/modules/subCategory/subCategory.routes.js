import express from "express";

import * as SC from "./controllers/subCategory.controller.js";

const subCategoryRouter = express.Router();

subCategoryRouter
  .post("/", SC.addSubCategory)
  .get("/allSubCategories", SC.getAllSubCategories)
  .get("/:slug", SC.getSubCategory)
  .put("/:slug", SC.updateSubCategory)
  .delete("/:slug", SC.deleteSubCategory);

export default subCategoryRouter;
