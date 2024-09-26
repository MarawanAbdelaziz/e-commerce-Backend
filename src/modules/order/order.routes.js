import express from "express";

import validation from "../../middleware/validation.js";
import * as OC from "./order.controller.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";
import * as OV from "./order.validation.js";

const orderRouter = express.Router();

orderRouter
  .post(
    "/",
    validation(OV.createOrder),
    auth(Object.values(systemRoles)),
    OC.createOrder
  )
  .put(
    "/:id",
    validation(OV.cancelOrder),
    auth([systemRoles.admin]),
    OC.cancelOrder
  );

export default orderRouter;
