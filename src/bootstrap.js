import connectDB from "../DB/DBConnection.js";
import companyRouter from "./modules/company/company.routes.js";
import jobRouter from "./modules/job/job.routes.js";
import userRouter from "./modules/user/user.routes.js";

const bootstrap = (app, express) => {
  connectDB();
  app.use(express.json());

  app.use("/user", userRouter);
  app.use("/company", companyRouter);
  app.use("/job", jobRouter);

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
