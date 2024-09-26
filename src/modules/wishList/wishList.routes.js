import express from "express";
import * as CC from "./wishList.controller.js";
import * as CV from "./wishList.validation.js";
import { auth } from "../../middleware/auth.js";
import systemRoles from "../../utils/systemRoles.js";
import validation from "../../middleware/validation.js";

const wishListRouter = express.Router({ mergeParams: true });

wishListRouter.post(
  "/",
  // validation(CV.createWishList),
  auth(Object.values(systemRoles)),
  CC.createWishList
);

export default wishListRouter;
