import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  username: String,
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  recoveryEmail: {
    type: String,
    lowercase: true,
    trim: true,
  },
  DOB: {
    type: Date,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "company_HR"],
    default: "user",
  },
  status: {
    type: String,
    required: true,
    enum: ["offline", "online"],
    default: "offline",
  },
  otp: {
    type: String,
    trim: true,
  },
});

const userModel = model("user", userSchema);

export default userModel;
