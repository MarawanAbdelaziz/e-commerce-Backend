import express from "express";

import * as SC from "./controllers/subCategory.controller.js";

const subCategoryRouter = express.Router();

subCategoryRouter
  .post("/", SC.addSubCategory)
  .get("/allProducts", SC.getAllSubCategories)
  .get("/", SC.getSubCategory)
  .put("/", SC.updateSubCategory)
  .delete("/", SC.deleteSubCategory);

export default subCategoryRouter;
