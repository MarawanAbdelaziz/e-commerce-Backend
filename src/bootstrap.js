import connectDB from "../DB/DBConnection.js";
import companyRouter from "./modules/company/company.routes.js";
import jobRouter from "./modules/job/job.routes.js";
import userRouter from "./modules/user/user.routes.js";

const bootstrap = (app, express) => {
  connectDB();
  app.use(express.json());

  app.use("/user", userRouter);
  app.use("/job", jobRouter);
  app.use("/user", companyRouter);
};

export default bootstrap;