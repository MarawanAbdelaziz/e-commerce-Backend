import express from "express";

import * as CC from "./category.controller.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";
import validation from "../../middleware/validation.js";
import * as CV  from "./category.validation.js";

// const categoryRouter = express.Router({ caseSensitive : true });
const categoryRouter = express.Router();

categoryRouter
  .post("/", auth([systemRoles.admin]), validation(CV.category), CC.addCategory)
  .get("/", CC.getAllCategories)
  .get("/:slug", CC.getCategory)
  .put("/:slug", auth([systemRoles.admin]), validation(CV.category), CC.updateCategory)
  .delete("/:slug", auth([systemRoles.admin]), CC.deleteCategory)
  .use("/:categorySlug/subCategory", subCategoryRouter);

export default categoryRouter;
