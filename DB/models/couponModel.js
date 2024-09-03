import mongoose, { Types } from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "code is required"],
      trim: true,
      minLength: [3, "code must be at least 3 characters"],
      lowercase: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
      min: [1, "amount must be at least 1"],
      max: [100, "amount must be at most 100"],
    },
    fromDate: {
      type: Date,
      required: [true, "fromDate is required"],
    },
    toDate: {
      type: Date,
      required: [true, "toDate is required"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
      required: [true, "createdBy is required"],
    },
    usedBy: [
      {
        type: Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const couponModel = mongoose.model("coupon", couponSchema);

export default couponModel;
