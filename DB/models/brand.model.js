import mongoose, { Schema, Types, model } from "mongoose";

const brandSchema = new Schema({
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
  isDeleted: {
    type: Boolean,
  },
});

const brandModel = mongoose.model.Brand || model("Brand", brandSchema);

export default brandModel;
