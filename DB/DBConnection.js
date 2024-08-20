import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DataBase connected"))
    .catch((error) => console.log("Unable to connect to DB", error));
};

export default connectDB;
