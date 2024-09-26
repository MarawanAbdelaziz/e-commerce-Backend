import express from "express";

import * as BC from "./brand.controller.js";
import { multerHost, validExtension } from "../../middleware/multer.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";
import { brand } from "./brand.validation.js";
import validation from "../../middleware/validation.js";

const brandRouter = express.Router();

brandRouter
  .post("/", auth([systemRoles.admin]), multerHost(validExtension.image).single("image"),  validation(brand), BC.addBrand)
  .get("/", BC.getAllBrands)
  .get("/:slug", BC.getBrand)
  .put("/:slug", auth([systemRoles.admin]),  multerHost(validExtension.image).single("image"), validation(brand), BC.updateBrand)
  .delete("/:slug", auth([systemRoles.admin]), BC.deleteBrand);

export default brandRouter;
