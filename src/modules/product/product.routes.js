import express from "express";

import * as PC from "./product.controller.js";
import { multerHost, validExtension } from "../../middleware/multer.js";
import validation from "../../middleware/validation.js";
import * as PV from "./product.validation.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";
import reviewRouter from "../review/review.routes.js";
import wishListRouter from "../wishList/wishList.routes.js";

const productRouter = express.Router({ mergeParams: true });

productRouter.use("/:productId/review", reviewRouter);
productRouter.use("/:productId/wishList", wishListRouter);

productRouter
  .post(
    "/",
    auth([systemRoles.admin]),
    multerHost(validExtension.image).array("images", 4),
    validation(PV.addProduct),
    PC.addProduct
  )
  .get("/", PC.getAllProducts)
  .get("/:slug", PC.getProduct)
  .put(
    "/:slug",
    auth([systemRoles.admin]),
    multerHost(validExtension.image).array("images", 4),
    validation(PV.putProduct),
    PC.updateProduct
  )
  .delete("/:slug", auth([systemRoles.admin]), PC.deleteProduct);

export default productRouter;
