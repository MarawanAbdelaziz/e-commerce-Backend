import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

const subCategorySchema = new Schema(
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
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: [true, "category is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "createdBy is required"],
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

subCategorySchema.virtual("products", {
  ref: "product",
  localField: "_id",
  foreignField: "subCategory",
});

const subCategoryModel = model("subCategory", subCategorySchema);

export default subCategoryModel;
