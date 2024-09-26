import connectDB from "../DB/DBConnection.js";
import cors from "cors";
import * as R from "./modules/index.routes.js";
import { deleteFromCloudinary } from "./utils/deleteFromCloudinary.js";
import { deleteFromDB } from "./utils/deleteFromDB.js";

const initApp = (app, express) => {
  app.use(cors());
  connectDB();
  app.use(express.json());

  app.use("/user", R.userRouter);
  app.use("/category", R.categoryRouter);
  app.use("/brand", R.brandRouter);
  app.use("/subCategory", R.subCategoryRouter);
  app.use("/product", R.productRouter);
  app.use("/coupon", R.couponRouter);
  app.use("/cart", R.cartRouter);
  app.use("/order", R.orderRouter);
  app.use("/review", R.reviewRouter);

  app.use("*", (req, res, next) => {
    next(new Error(`inValid url: ${req.originalUrl}`, { cause: 404 }));
  });

  app.use(deleteFromCloudinary, deleteFromDB);

  app.use((error, req, res, next) =>
    res
      .status(error.cause || 400)
      .json({ msg: "Catch error", error: error.message })
  );
};

export default initApp;
