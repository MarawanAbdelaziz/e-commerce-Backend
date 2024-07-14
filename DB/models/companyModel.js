import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  industry: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  numberOfEmployees: {
    type: String,
    required: true,
    trim: true,
  },
  companyEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  companyHR: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const companyModel = model("company", companySchema);

export default companyModel;
