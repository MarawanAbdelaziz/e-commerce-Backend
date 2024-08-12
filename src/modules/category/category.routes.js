import express from "express";

import * as CC from "./controllers/category.controller.js";
import multerLoacl, { validExtension } from "../../services/multerLocal.js";

const categoryRouter = express.Router();

categoryRouter
  .post("/", multerLoacl(validExtension.image,'category').single("image"), CC.addCategory)
  .get("/allCategories", CC.getAllCategories)
  .get("/:slug", CC.getCategory)
  .put("/:slug", multerLoacl(validExtension.image,'category').single("image"), CC.updateCategory)
  .delete("/:slug", CC.deleteCategory);

export default categoryRouter;
