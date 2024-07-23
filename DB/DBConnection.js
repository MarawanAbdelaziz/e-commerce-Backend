import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/e-commerce")
    .then(() => console.log("DataBase connected"))
    .catch((error) => console.log("Unable to connect to DB", error));
};

export default connectDB;
