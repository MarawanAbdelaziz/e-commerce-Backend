import express from "express";

import * as PC from "./controllers/product.controller.js";

const productRouter = express.Router();

productRouter
  .post("/", PC.addProduct)
  .get("/allProducts", PC.getAllProducts)
  .get("/", PC.getProduct)
  .put("/", PC.updateProduct)
  .delete("/", PC.deleteProduct);

export default productRouter;
