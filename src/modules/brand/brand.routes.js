import express from "express";

import * as BC from "./brand.controller.js";
import { multerHost, validExtension } from "../../middleware/multer.js";

const brandRouter = express.Router();

brandRouter
  .post("/", multerHost(validExtension.image).single("image"), BC.addBrand)
  .get("/", BC.getAllBrands)
  .get("/:slug", BC.getBrand)
  .put("/:slug", multerHost(validExtension.image).single("image"), BC.updateBrand)
  .delete("/:slug", BC.deleteBrand);

export default brandRouter;
