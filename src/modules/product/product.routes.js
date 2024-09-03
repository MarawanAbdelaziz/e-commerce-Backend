import express from "express";

import * as PC from "./product.controller.js";
import { multerHost, validExtension } from "../../middleware/multer.js";
import validation from "../../middleware/validation.js";
import * as PV  from "./product.validation.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";

const productRouter = express.Router();

productRouter
  .post("/", auth([systemRoles.admin]), validation(PV.addProduct), multerHost(validExtension.image).array("images", 4), PC.addProduct)
  .get("/", PC.getAllProducts)
  .get("/:slug", PC.getProduct)
  .put("/:slug", auth([systemRoles.admin]),  multerHost(validExtension.image).array("images", 4), validation(PV.putProduct),  PC.updateProduct)
  .delete("/:slug", auth([systemRoles.admin]), PC.deleteProduct);

export default productRouter;
