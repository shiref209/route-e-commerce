import mongoose, { Schema, Types, model } from "mongoose";

const couponSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: [true, "name must be unique"],
    trim: true,
    lowercase: true,
  },
  slug: {
    type: String,
    required: [true, "slug is required"],
    unique: [true, "slug must be unique"],
    trim: true,
    lowercase: true,
  },
  image: {
    type: Object,
  },
  userId: {
    type: Types.ObjectId,
    required: [false, "user-id is required"],
  },
  amount: {
    type: Number,
    min: 1,
    max: 100,
  },
  usedBy: [
    {
      type: Types.ObjectId,
    },
  ],
  expiresIn: {
    type: Date,
    required: [true, "expire date is required"],
  },
  isDeleted: {
    type: Boolean,
  },
});

const couponModel = mongoose.model.Coupon || model("Coupon", couponSchema);

export default couponModel;
