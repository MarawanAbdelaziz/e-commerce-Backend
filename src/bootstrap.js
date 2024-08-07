import connectDB from "../DB/DBConnection.js";
import brandRouter from "./modules/brand/brand.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";

const bootstrap = (app, express) => {
  connectDB();
  app.use(express.json());

  app.use("/category", categoryRouter);
  app.use("/brand", brandRouter);
  app.use("/subCategory", subCategoryRouter);

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
