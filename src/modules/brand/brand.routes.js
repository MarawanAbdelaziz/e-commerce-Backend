import express from "express";

import * as BC from "./brand.controller.js";
import { multerHost, validExtension } from "../../middleware/multer.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";
import { brand } from "./brand.validation.js";
import validation from "../../middleware/validation.js";

const brandRouter = express.Router();

brandRouter
  .post("/", auth([systemRoles.admin]), validation(brand), multerHost(validExtension.image).single("image"), BC.addBrand)
  .get("/", auth([systemRoles.admin, systemRoles.user]), BC.getAllBrands)
  .get("/:slug", auth([systemRoles.admin, systemRoles.user]), BC.getBrand)
  .put("/:slug", auth([systemRoles.admin]), validation(brand), multerHost(validExtension.image).single("image"), BC.updateBrand)
  .delete("/:slug", auth([systemRoles.admin]), BC.deleteBrand);

export default brandRouter;
