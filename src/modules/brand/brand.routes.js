import express from "express";

import * as BC from "./controllers/brand.controller.js";
import multerLoacl, { validExtension } from "../../services/multerLocal.js";

const brandRouter = express.Router();

brandRouter
  .post("/", multerLoacl(validExtension.image,'brand').single("image"), BC.addBrand)
  .get("/allBrands", BC.getAllBrands)
  .get("/:slug", BC.getBrand)
  .put("/:slug", multerLoacl(validExtension.image,'brand').single("image"), BC.updateBrand)
  .delete("/:slug", BC.deleteBrand);

export default brandRouter;
