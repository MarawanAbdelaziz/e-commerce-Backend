import express from "express";

import * as CC from "./controllers/category.controller.js";

const categoryRouter = express.Router();


categoryRouter
  .post("/", CC.addCategory)
  .get("/allCategories", CC.getAllCategories)
  .get("/:slug", CC.getCategory)
  .put("/:slug", CC.updateCategory)
  .delete("/:slug", CC.deleteCategory);

export default categoryRouter;
