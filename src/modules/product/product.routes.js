import express from "express";

import * as PC from "./product.controller.js";
import { multerHost, validExtension } from "../../middleware/multer.js";

const productRouter = express.Router();

productRouter
  .post(
    "/",
    multerHost(validExtension.image).fields([
      { name: "image", maxCount: 1 },
      { name: "images", maxCount: 4 },
    ]),
    PC.addProduct
  )
  .get("/", PC.getAllProducts)
  .get("/:slug", PC.getProduct)
  .put(
    "/:slug",
    multerHost(validExtension.image).fields([
      { name: "image", maxCount: 1 },
      { name: "images", maxCount: 4 },
    ]),
    PC.updateProduct
  )
  .delete("/:slug", PC.deleteProduct);

export default productRouter;
