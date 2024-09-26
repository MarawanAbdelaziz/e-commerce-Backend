import express from "express";

import validation from "../../middleware/validation.js";
import * as CC from "./cart.controller.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";
import * as CV from "./cart.validation.js";

const cartRouter = express.Router();

cartRouter
  .post(
    "/",
    validation(CV.addCart),
    auth(Object.values(systemRoles)),
    CC.addCart
  )
  .patch(
    "/",
    validation(CV.removeCart),
    auth(Object.values(systemRoles)),
    CC.removeCart
  )
  .put(
    "/",
    validation(CV.clearCart),
    auth(Object.values(systemRoles)),
    CC.clearCart
  )
  .get(
    "/",
    validation(CV.clearCart),
    auth(Object.values(systemRoles)),
    CC.getCart
  );

export default cartRouter;
