import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://marawanabdelaziz33:fX31NOVrFwsJr8iJ@cluster0.kvt9y3y.mongodb.net/JobSearchApp?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("DataBase connected"))
    .catch((error) => console.log("Unable to connect to DB", error));
};

export default connectDB;
