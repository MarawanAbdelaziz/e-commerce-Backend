import connectDB from "../DB/DBConnection.js";
import brandRouter from "./modules/brand/brand.routes.js";
import categoryRouter from "./modules/category/category.routes.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger/swaggerConfig.js";

const bootstrap = (app, express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  connectDB();
  app.use(express.json());

  app.use("/category", categoryRouter);
  app.use("/brand", brandRouter);

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
