import { ref, string } from "joi";
import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name is unique"],
      trim: true,
      lowercase: true,
      minLength: [3, "min length of name is 3 character"],
      maxLength: [150, "max length of name is 150 character"],
    },
    slug: {
      type: String,
      required: true,
    },
    image: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      // required: true,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const categoryModel = model("category", categorySchema);

export default categoryModel;
