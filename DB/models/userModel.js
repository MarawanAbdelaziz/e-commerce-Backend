import mongoose from "mongoose";
import systemRoles from "../../src/utils/systemRoles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [32, "name must be at most 32 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [5, "password must be at least 5 characters"],
      trim: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    loggedIn: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(systemRoles),
      default: "user",
    },
    phone: [String],
    address: [String],
    code: String,
    passwordChangeAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
