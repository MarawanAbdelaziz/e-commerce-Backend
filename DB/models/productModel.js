import { ref, string } from "joi";
import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
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
    coverImages: [String],
    price: {
      type: Number,
      required: [true, "price is required"],
      trim: true,
      min: [0, "min price is 0"],
    },
    priceAfterDiscount: {
      type: Number,
      trim: true,
      min: [0, "min priceAfterDiscount is 0"],
    },
    stock: {
      type: Number,
      default: 0,
      trim: true,
      min: [0, "min stock is 0"],
    },
    sold: {
      type: Number,
      trim: true,
      min: [0, "min sold is 0"],
    },
    rateCount: {
      type: Number,
      trim: true,
      min: [0, "min rateCount is 0"],
    },
    rateAvrage: {
      type: Number,
      trim: true,
      min: [0, "min rateAvrage is 0"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: [true, "category is required"],
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "subCategory",
      required: [true, "subCategory is required"],
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
      required: [true, "brand is required"],
    },

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

const productModel = model("product", productSchema);

export default productModel;
