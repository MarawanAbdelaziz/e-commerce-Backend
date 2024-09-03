import express from "express";

import validation from "../../middleware/validation.js";
import * as CC from "./cart.controller.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";
import * as CV from "./cart.validation.js";

const cartRouter = express.Router();

cartRouter
  .post("/", validation(CV.addCart), auth(systemRoles.admin), CC.addCart)
  .put("/:id", validation(CV.updateCart), auth(systemRoles.admin), CC.updateCart);

export default cartRouter;
