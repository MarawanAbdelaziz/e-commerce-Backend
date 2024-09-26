import express from "express";
import * as CC from "./review.controller.js";
import * as CV from "./review.validation.js";
import systemRoles from "../../utils/systemRoles.js";
import validation from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .post(
    "/",
    validation(CV.createReview),
    auth(Object.values(systemRoles)),
    CC.createReview
  )
  .delete("/:id", auth(Object.values(systemRoles)), CC.deleteReview);

export default reviewRouter;
