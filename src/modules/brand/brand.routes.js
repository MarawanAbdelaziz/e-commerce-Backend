import express from "express";

import * as BC from "./controllers/brand.controller.js";

const brandRouter = express.Router();

brandRouter
  .post("/", BC.addBrand)
  .get("/allBrands", BC.getAllBrands)
  .get("/:slug", BC.getBrand)
  .put("/:slug", BC.updateBrand)
  .delete("/:slug", BC.deleteBrand);

export default brandRouter;
