import express from "express";

import * as CC from "./category.controller.js";
import { multerHost, validExtension } from "../../middleware/multer.js";

const categoryRouter = express.Router();

categoryRouter
  .post("/", CC.addCategory)
  .get("/", CC.getAllCategories)
  .get("/:slug", CC.getCategory)
  .put("/:slug", CC.updateCategory)
  .delete("/:slug", CC.deleteCategory);

export default categoryRouter;
