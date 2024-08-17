import connectDB from "../DB/DBConnection.js";
import cors from "cors";
import * as r from "./modules/index.routes.js";

const bootstrap = (app, express) => {
  app.use(cors());
  connectDB();
  app.use(express.json());

  app.use("/user", r.userRouter);
  app.use("/category", r.categoryRouter);
  app.use("/brand", r.brandRouter);
  app.use("/subCategory", r.subCategoryRouter);
  app.use("/product", r.productRouter);

  app.use("*", (req, res, next) => {
    next(new Error(`inValid url: ${req.originalUrl}`, { cause: 404 }));
  });

  app.use((error, req, res, next) =>
    res
      .status(error.cause || 400)
      .json({ msg: "Catch error", error: error.message })
  );
};

export default bootstrap;
