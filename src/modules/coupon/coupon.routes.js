import express from "express";

import validation from "../../middleware/validation.js";
import * as CC from "./coupon.controller.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";
import * as CV from "./coupon.validation.js";

const couponRouter = express.Router();

couponRouter
  .post("/", validation(CV.addCoupon), auth(systemRoles.admin), CC.addCoupon)
  .put("/:id", validation(CV.updateCoupon), auth(systemRoles.admin), CC.updateCoupon);

export default couponRouter;
