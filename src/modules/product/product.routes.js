import express from "express";

import * as PC from "./controllers/product.controller.js";
import multerLoacl, { validExtension } from "../../services/multerLocal.js";

const productRouter = express.Router();

productRouter
  .post(
    "/",
    multerLoacl(validExtension.image, "product").fields([
      { name: "image", maxCount: 1 },
      { name: "images", maxCount: 4 },
    ]),
    PC.addProduct
  )
  .get("/allProducts", PC.getAllProducts)
  .get("/:slug", PC.getProduct)
  .put(
    "/:slug",
    multerLoacl(validExtension.image, "product").fields([
      { name: "image", maxCount: 1 },
      { name: "images", maxCount: 4 },
    ]),
    PC.updateProduct
  )
  .delete("/:slug", PC.deleteProduct);

export default productRouter;
